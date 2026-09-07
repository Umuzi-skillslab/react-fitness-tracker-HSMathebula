import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import WorkoutLog from './WorkoutLog';

const logs = [
  {
    id: 'log-1',
    date: '2026-09-02',
    exerciseName: 'Push-Up',
    sets: 3,
    reps: 12,
    weight: 0,
  },
];

describe('WorkoutLog', () => {
  test('shows an empty state', () => {
    render(
      <MemoryRouter>
        <WorkoutLog logs={[]} onDelete={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(/no workouts yet/i)).toBeInTheDocument();
  });

  test('deletes a logged workout', async () => {
    const user = userEvent.setup();
    const handleDelete = jest.fn();

    render(
      <MemoryRouter>
        <WorkoutLog logs={logs} onDelete={handleDelete} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: '2026-09-02' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(handleDelete).toHaveBeenCalledWith('log-1');
  });
});
