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
  test('shows a missing state for an unknown log', () => {
    renderDetail('missing');
    expect(screen.getByRole('heading', { name: /log not found/i })).toBeInTheDocument();
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
});
