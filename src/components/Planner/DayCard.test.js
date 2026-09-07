import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DayCard from './DayCard';

describe('DayCard', () => {
  test('shows an empty state when the day has no exercises', () => {
    render(<DayCard day="Monday" exercises={[]} onRemove={jest.fn()} />);

    expect(screen.getByRole('heading', { name: /monday/i })).toBeInTheDocument();
    expect(screen.getByText(/no exercises planned/i)).toBeInTheDocument();
  });

  test('removes and logs a planned exercise', async () => {
    const user = userEvent.setup();
    const handleRemove = jest.fn();
    const handleLog = jest.fn();

    render(
      <DayCard
        day="Tuesday"
        exercises={[{ id: 2, name: 'Push-Up', difficulty: 'Beginner' }]}
        onRemove={handleRemove}
        onLog={handleLog}
      />
    );

    await user.click(screen.getByRole('button', { name: /log push-up from tuesday/i }));
    await user.click(screen.getByRole('button', { name: /remove push-up from tuesday/i }));
    await user.click(screen.getByRole('button', { name: /yes, remove/i }));

    expect(handleLog).toHaveBeenCalledWith(
      expect.objectContaining({ id: 2, name: 'Push-Up' })
    );
    expect(handleRemove).toHaveBeenCalledWith('Tuesday', 2);
  });

  test('marks a planned exercise done on today', async () => {
    const user = userEvent.setup();
    const handleToggle = jest.fn();

    render(
      <DayCard
        day="Monday"
        isToday
        exercises={[{ id: 2, name: 'Push-Up', done: false }]}
        onRemove={jest.fn()}
        onToggleDone={handleToggle}
      />
    );

    expect(screen.getByText(/^today$/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /mark push-up done on monday/i }));
    expect(handleToggle).toHaveBeenCalledWith('Monday', 2);
  });

  test('renders a planned exercise without optional badges or log action', () => {
    render(
      <DayCard
        day="Friday"
        exercises={[{ id: 5, name: 'Jump Rope' }]}
        onRemove={jest.fn()}
      />
    );

    expect(screen.getByText(/jump rope/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /log jump rope/i })).not.toBeInTheDocument();
  });

  test('can cancel a remove and undo a completed move', async () => {
    const user = userEvent.setup();
    const handleRemove = jest.fn();
    const handleToggle = jest.fn();

    render(
      <DayCard
        day="Wednesday"
        isToday
        exercises={[{ id: 3, name: 'Plank', done: true, muscleGroup: 'Core' }]}
        onRemove={handleRemove}
        onToggleDone={handleToggle}
      />
    );

    await user.click(screen.getByRole('button', { name: /undo plank done on wednesday/i }));
    expect(handleToggle).toHaveBeenCalledWith('Wednesday', 3);

    await user.click(screen.getByRole('button', { name: /remove plank from wednesday/i }));
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(handleRemove).not.toHaveBeenCalled();
  });
});
