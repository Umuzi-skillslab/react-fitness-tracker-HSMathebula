import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HistoryPage from './HistoryPage';
import { STORAGE_KEYS, saveToStorage } from '../utils/helpers';

describe('HistoryPage', () => {
  test('edits a saved log and can cancel a delete', async () => {
    const user = userEvent.setup();
    saveToStorage(STORAGE_KEYS.WORKOUT_LOGS, [
      {
        id: 'log-edit',
        exerciseId: 2,
        exerciseName: 'Push-Up',
        date: '2026-09-01',
        sets: 3,
        reps: 12,
        weight: 0,
      },
    ]);

    render(
      <MemoryRouter>
        <HistoryPage />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /^edit$/i }));
    expect(screen.getByRole('heading', { name: /edit push-up/i })).toBeInTheDocument();

    await user.clear(screen.getByLabelText(/^sets$/i));
    await user.type(screen.getByLabelText(/^sets$/i), '5');
    await user.click(screen.getByRole('button', { name: /save changes/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/updated push-up/i);
    expect(screen.getByText(/5 sets × 12 reps/i)).toBeInTheDocument();
  });
});
