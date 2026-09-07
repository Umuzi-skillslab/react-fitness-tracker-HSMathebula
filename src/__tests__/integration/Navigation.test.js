import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { STORAGE_KEYS, saveToStorage } from '../../utils/helpers';

describe('routing', () => {
  test('navigates from the navbar to the exercises page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('link', { name: /^exercises$/i }));
    expect(
      screen.getByRole('heading', { name: /exercise library/i })
    ).toBeInTheDocument();
  });

  test('renders a dynamic exercise detail route', () => {
    render(
      <MemoryRouter initialEntries={['/exercises/2']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /push-up/i })).toBeInTheDocument();
  });

  test('renders a dynamic history detail route', () => {
    saveToStorage(STORAGE_KEYS.WORKOUT_LOGS, [
      {
        id: '1',
        date: '2026-09-01',
        exerciseName: 'Push-Up',
        sets: 3,
        reps: 12,
        weight: 0,
      },
    ]);

    render(
      <MemoryRouter initialEntries={['/history/1']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/workout log #1/i)).toBeInTheDocument();
  });

  test('shows the 404 page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/does-not-exist']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  test('uses programmatic navigation from home to an exercise', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await user.click(screen.getAllByRole('button', { name: /view details/i })[0]);
    expect(
      screen.getByRole('heading', { name: /barbell squat/i })
    ).toBeInTheDocument();
  });
});
