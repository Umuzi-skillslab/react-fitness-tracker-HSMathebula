import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import { STORAGE_KEYS, getWeekdayName, saveToStorage } from '../utils/helpers';

describe('Home', () => {
  test('filters featured exercises and opens the library', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<p>Library page</p>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /fitness tracker/i })).toBeInTheDocument();
    await user.type(screen.getByRole('searchbox'), 'xyz-no-match');
    expect(screen.getByText(/no featured exercises match/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /browse all exercises/i }));
    expect(screen.getByText(/library page/i)).toBeInTheDocument();
  });

  test('adds a featured exercise to the weekly plan', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await user.click(screen.getAllByRole('button', { name: /add to planner/i })[0]);
    await user.selectOptions(screen.getByLabelText(/choose a day/i), 'Tuesday');
    await user.click(screen.getByRole('button', { name: /add to tuesday/i }));

    expect(screen.getByRole('status')).toHaveTextContent(
      /added barbell squat to tuesday/i
    );
  });

  test('shows today’s plan and can open the logger', async () => {
    const user = userEvent.setup();
    const today = getWeekdayName();
    saveToStorage(STORAGE_KEYS.WEEKLY_PLAN, {
      [today]: [{ id: 2, name: 'Push-Up', muscleGroup: 'Chest', done: false }],
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<p>History logger</p>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getAllByText(/push-up/i).length).toBeGreaterThan(0);
    await user.click(screen.getByRole('button', { name: /^log$/i }));
    expect(screen.getByText(/history logger/i)).toBeInTheDocument();
  });
});
