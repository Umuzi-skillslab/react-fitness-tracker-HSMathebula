import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LogEntry from './LogEntry';

const log = {
  id: 'log-1',
  date: '2026-09-01',
  exerciseName: 'Push-Up',
  sets: 3,
  reps: 12,
  weight: 0,
};

describe('LogEntry', () => {
  test('shows bodyweight volume and navigates to the detail route', async () => {
    const user = userEvent.setup();
    const handleDelete = jest.fn();

    render(
      <MemoryRouter initialEntries={['/history']}>
        <Routes>
          <Route
            path="/history"
            element={<LogEntry log={log} onDelete={handleDelete} />}
          />
          <Route path="/history/:logId" element={<p>Log detail</p>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/bodyweight/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /view log/i }));
    expect(screen.getByText(/log detail/i)).toBeInTheDocument();
  });

  test('confirms before deleting a log', async () => {
    const user = userEvent.setup();
    const handleDelete = jest.fn();

    render(
      <MemoryRouter>
        <LogEntry log={{ ...log, weight: 20 }} onDelete={handleDelete} onEdit={jest.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText(/3 sets × 12 reps · 20 kg/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^edit$/i }));
    await user.click(screen.getByRole('button', { name: /^delete$/i }));
    await user.click(screen.getByRole('button', { name: /yes, delete/i }));
    expect(handleDelete).toHaveBeenCalledWith('log-1');
  });
});
