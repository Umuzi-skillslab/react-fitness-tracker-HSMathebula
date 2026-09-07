import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { STORAGE_KEYS } from '../utils/helpers';
import usePersistedState from './usePersistedState';
import useWeeklyPlan from './useWeeklyPlan';
import useWorkoutLogs from './useWorkoutLogs';

function PlanProbe() {
  const { plan, addExercise, removeExercise, toggleDone } = useWeeklyPlan();

  return (
    <div>
      <span data-testid="monday-count">{plan.Monday.length}</span>
      <span data-testid="monday-done">{String(plan.Monday[0]?.done || false)}</span>
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
      <button type="button" onClick={() => toggleDone('Monday', 2)}>
        Toggle
      </button>
    </div>
  );
}

function LogProbe() {
  const { logs, addLog, deleteLog, updateLog } = useWorkoutLogs();

  return (
    <div>
      <span data-testid="log-count">{logs.length}</span>
      <span data-testid="log-sets">{logs[0]?.sets || 0}</span>
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
        onClick={() =>
          logs[0] &&
          updateLog(logs[0].id, {
            ...logs[0],
            sets: 6,
            reps: logs[0].reps,
            weight: logs[0].weight,
            date: logs[0].date,
            exerciseName: logs[0].exerciseName,
            exerciseId: logs[0].exerciseId,
          })
        }
      >
        Update
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

    await user.click(screen.getByRole('button', { name: /toggle/i }));
    expect(screen.getByTestId('monday-done')).toHaveTextContent('true');

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

    await user.click(screen.getByRole('button', { name: /update/i }));
    expect(screen.getByTestId('log-sets')).toHaveTextContent('6');

    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(screen.getByTestId('log-count')).toHaveTextContent('0');
  });

  test('accepts a direct state value from the setter', async () => {
    const user = userEvent.setup();

    function ValueProbe() {
      const [value, setValue] = usePersistedState('probe-key', { n: 1 });
      return (
        <button type="button" onClick={() => setValue({ n: 5 })}>
          {value.n}
        </button>
      );
    }

    render(<ValueProbe />);
    await user.click(screen.getByRole('button', { name: '1' }));
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('probe-key'))).toEqual({ n: 5 });
  });
});
