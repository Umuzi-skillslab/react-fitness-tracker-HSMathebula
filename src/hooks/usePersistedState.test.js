import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { STORAGE_KEYS } from '../utils/helpers';
import useWeeklyPlan from './useWeeklyPlan';
import useWorkoutLogs from './useWorkoutLogs';

function PlanProbe() {
  const { plan, addExercise, removeExercise } = useWeeklyPlan();

  return (
    <div>
      <span data-testid="monday-count">{plan.Monday.length}</span>
      <button
        type="button"
        onClick={() =>
          addExercise('Monday', { id: 2, name: 'Push-Up', difficulty: 'Beginner' })
        }
      >
        Add
      </button>
      <button type="button" onClick={() => removeExercise('Monday', 2)}>
        Remove
      </button>
    </div>
  );
}

function LogProbe() {
  const { logs, addLog, deleteLog } = useWorkoutLogs();

  return (
    <div>
      <span data-testid="log-count">{logs.length}</span>
      <button
        type="button"
        onClick={() =>
          addLog({
            exerciseId: 2,
            exerciseName: 'Push-Up',
            date: '2026-09-01',
            sets: 3,
            reps: 10,
            weight: 0,
          })
        }
      >
        Log
      </button>
      <button
        type="button"
        onClick={() => logs[0] && deleteLog(logs[0].id)}
      >
        Delete
      </button>
    </div>
  );
}

describe('persisted hooks', () => {
  test('saves the weekly plan through useEffect', async () => {
    const user = userEvent.setup();
    render(<PlanProbe />);

    await user.click(screen.getByRole('button', { name: /^add$/i }));
    expect(screen.getByTestId('monday-count')).toHaveTextContent('1');

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.WEEKLY_PLAN));
    expect(stored.Monday[0].name).toBe('Push-Up');

    await user.click(screen.getByRole('button', { name: /remove/i }));
    expect(screen.getByTestId('monday-count')).toHaveTextContent('0');
  });

  test('saves workout logs through useEffect', async () => {
    const user = userEvent.setup();
    render(<LogProbe />);

    await user.click(screen.getByRole('button', { name: /^log$/i }));
    expect(screen.getByTestId('log-count')).toHaveTextContent('1');

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.WORKOUT_LOGS));
    expect(stored[0].exerciseName).toBe('Push-Up');

    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(screen.getByTestId('log-count')).toHaveTextContent('0');
  });
});
