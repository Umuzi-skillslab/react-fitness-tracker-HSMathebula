import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
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
});
