import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogForm from './LogForm';

const exercises = [
  { id: 1, name: 'Barbell Squat' },
  { id: 2, name: 'Push-Up' },
];

describe('LogForm', () => {
  test('requires an exercise before submit', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(<LogForm exercises={exercises} onSubmit={handleSubmit} />);

    await user.click(screen.getByRole('button', { name: /log workout/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/choose an exercise/i);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('submits a valid log entry', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(
      <LogForm
        exercises={exercises}
        initialExerciseId={2}
        onSubmit={handleSubmit}
      />
    );

    await user.clear(screen.getByLabelText(/^sets$/i));
    await user.type(screen.getByLabelText(/^sets$/i), '4');
    await user.clear(screen.getByLabelText(/^reps$/i));
    await user.type(screen.getByLabelText(/^reps$/i), '8');
    await user.click(screen.getByRole('button', { name: /log workout/i }));

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        exerciseId: 2,
        exerciseName: 'Push-Up',
        sets: 4,
        reps: 8,
        weight: 0,
      })
    );
  });
});
