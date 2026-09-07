import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HistoryDetailPage from './HistoryDetailPage';
import { STORAGE_KEYS, saveToStorage } from '../utils/helpers';

function renderDetail(logId) {
  return render(
    <MemoryRouter initialEntries={[`/history/${logId}`]}>
      <Routes>
        <Route path="/history/:logId" element={<HistoryDetailPage />} />
        <Route path="/history" element={<p>History list</p>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('HistoryDetailPage', () => {
  test('shows a missing state for an unknown log', async () => {
    const user = userEvent.setup();
    renderDetail('missing');
    expect(screen.getByRole('heading', { name: /log not found/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /back to history/i }));
    expect(screen.getByText(/history list/i)).toBeInTheDocument();
  });

  test('renders a saved log and can return to history', async () => {
    const user = userEvent.setup();
    saveToStorage(STORAGE_KEYS.WORKOUT_LOGS, [
      {
        id: 'log-1',
        date: '2026-09-01',
        exerciseName: 'Push-Up',
        sets: 3,
        reps: 12,
        weight: 0,
      },
    ]);

    renderDetail('log-1');

    expect(screen.getByText(/workout log #log-1/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /back to history/i }));
    expect(screen.getByText(/history list/i)).toBeInTheDocument();
  });

  test('opens progress and can delete a saved log', async () => {
    const user = userEvent.setup();
    saveToStorage(STORAGE_KEYS.WORKOUT_LOGS, [
      {
        id: 'log-2',
        date: '2026-09-02',
        exerciseName: 'Deadlift',
        sets: 3,
        reps: 5,
        weight: 80,
      },
    ]);

    render(
      <MemoryRouter initialEntries={['/history/log-2']}>
        <Routes>
          <Route path="/history/:logId" element={<HistoryDetailPage />} />
          <Route path="/progress" element={<p>Progress page</p>} />
          <Route path="/history" element={<p>History list</p>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/80 kg/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /see progress/i }));
    expect(screen.getByText(/progress page/i)).toBeInTheDocument();
  });

  test('opens the history logger in edit mode', async () => {
    const user = userEvent.setup();
    saveToStorage(STORAGE_KEYS.WORKOUT_LOGS, [
      {
        id: 'log-edit',
        date: '2026-09-01',
        exerciseName: 'Push-Up',
        sets: 3,
        reps: 12,
        weight: 0,
      },
    ]);

    renderDetail('log-edit');
    await user.click(screen.getByRole('button', { name: /edit log/i }));
    expect(screen.getByText(/history list/i)).toBeInTheDocument();
  });

  test('can cancel deleting a saved log', async () => {
    const user = userEvent.setup();
    saveToStorage(STORAGE_KEYS.WORKOUT_LOGS, [
      {
        id: 'log-keep',
        date: '2026-09-01',
        exerciseName: 'Push-Up',
        sets: 3,
        reps: 12,
        weight: 0,
      },
    ]);

    renderDetail('log-keep');
    await user.click(screen.getByRole('button', { name: /delete log/i }));
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.getByRole('heading', { name: /push-up/i })).toBeInTheDocument();
  });

  test('deletes a saved log and returns to history', async () => {
    const user = userEvent.setup();
    saveToStorage(STORAGE_KEYS.WORKOUT_LOGS, [
      {
        id: 'log-3',
        date: '2026-09-03',
        exerciseName: 'Plank',
        sets: 3,
        reps: 30,
        weight: 0,
      },
    ]);

    renderDetail('log-3');
    await user.click(screen.getByRole('button', { name: /delete log/i }));
    await user.click(screen.getByRole('button', { name: /yes, delete/i }));
    expect(screen.getByText(/history list/i)).toBeInTheDocument();
  });
});
