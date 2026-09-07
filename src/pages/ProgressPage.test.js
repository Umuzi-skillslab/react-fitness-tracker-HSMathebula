import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProgressPage from './ProgressPage';
import { STORAGE_KEYS, saveToStorage } from '../utils/helpers';

describe('ProgressPage', () => {
  test('reads saved logs and shows totals', () => {
    saveToStorage(STORAGE_KEYS.WORKOUT_LOGS, [
      {
        id: 'log-1',
        date: '2026-09-01',
        exerciseName: 'Barbell Squat',
        sets: 3,
        reps: 8,
        weight: 60,
      },
    ]);

    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    );

    expect(screen.getAllByText('1440').length).toBeGreaterThan(0);
    expect(screen.getByRole('img', { name: /daily workout volume/i })).toBeInTheDocument();
  });

  test('links back to the history logger', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/progress']}>
        <Routes>
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/history" element={<p>History page</p>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /log another workout/i }));
    expect(screen.getByText(/history page/i)).toBeInTheDocument();
  });
});
