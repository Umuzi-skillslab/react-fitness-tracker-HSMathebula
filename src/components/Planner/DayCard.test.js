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

    expect(handleLog).toHaveBeenCalledWith(
      expect.objectContaining({ id: 2, name: 'Push-Up' })
    );
    expect(handleRemove).toHaveBeenCalledWith('Tuesday', 2);
  });
});
