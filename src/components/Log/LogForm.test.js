import { fireEvent, render, screen } from '@testing-library/react';
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

  test('requires a workout date', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(
      <LogForm
        exercises={exercises}
        initialExerciseId={1}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/workout date/i), {
      target: { value: '' },
    });
    await user.click(screen.getByRole('button', { name: /log workout/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/choose a date/i);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('requires sets and reps of at least 1', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(
      <LogForm
        exercises={exercises}
        initialExerciseId={1}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/^sets$/i), { target: { value: '0' } });
    await user.click(screen.getByRole('button', { name: /log workout/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/sets and reps must be at least 1/i);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('prefills the last logged numbers for an exercise', async () => {
    const user = userEvent.setup();

    render(
      <LogForm
        exercises={exercises}
        logs={[
          {
            exerciseId: 2,
            exerciseName: 'Push-Up',
            date: '2026-09-01',
            sets: 5,
            reps: 8,
            weight: 12,
          },
        ]}
        onSubmit={jest.fn()}
      />
    );

    await user.selectOptions(screen.getByLabelText(/exercise to log/i), '2');
    expect(screen.getByLabelText(/^sets$/i)).toHaveValue(5);
    expect(screen.getByLabelText(/^reps$/i)).toHaveValue(8);
    expect(screen.getByLabelText(/weight in kilograms/i)).toHaveValue(12);
  });

  test('rejects a negative weight', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(
      <LogForm
        exercises={exercises}
        initialExerciseId={1}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.change(screen.getByLabelText(/weight in kilograms/i), {
      target: { value: '-5' },
    });
    await user.click(screen.getByRole('button', { name: /log workout/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/weight cannot be negative/i);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test('saves changes for an existing log without resetting the form', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(
      <LogForm
        exercises={exercises}
        initialLog={{
          id: 'log-1',
          exerciseId: 1,
          date: '2026-09-01',
          sets: 4,
          reps: 6,
          weight: 50,
        }}
        onSubmit={handleSubmit}
      />
    );

    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^sets$/i)).toHaveValue(4);
    await user.click(screen.getByRole('button', { name: /save changes/i }));
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        exerciseId: 1,
        exerciseName: 'Barbell Squat',
        sets: 4,
        reps: 6,
        weight: 50,
      })
    );
    expect(screen.getByLabelText(/^sets$/i)).toHaveValue(4);
  });

  test('treats a partial initial log as empty exercise and bodyweight', async () => {
    const user = userEvent.setup();

    render(
      <LogForm
        exercises={exercises}
        initialLog={{
          date: '2026-09-01',
          sets: 2,
          reps: 4,
        }}
        onSubmit={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/exercise to log/i)).toHaveValue('');
    expect(screen.getByLabelText(/weight in kilograms/i)).toHaveValue(0);
    await user.selectOptions(screen.getByLabelText(/exercise to log/i), '2');
    expect(screen.getByLabelText(/^sets$/i)).toHaveValue(2);
  });
});
