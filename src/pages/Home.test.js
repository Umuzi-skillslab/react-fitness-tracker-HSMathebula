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

  test('marks a planned move done and offers empty-session shortcuts', async () => {
    const user = userEvent.setup();
    const today = getWeekdayName();
    saveToStorage(STORAGE_KEYS.WEEKLY_PLAN, {
      [today]: [{ id: 1, name: 'Barbell Squat', muscleGroup: 'Legs', done: false }],
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<p>Planner page</p>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /mark done/i }));
    expect(screen.getByRole('button', { name: /undo done/i })).toBeInTheDocument();
  });

  test('sends an empty session to the library', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<p>Library page</p>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/nothing planned/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^browse exercises$/i }));
    expect(screen.getByText(/library page/i)).toBeInTheDocument();
  });

  test('opens the library from the hero', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<p>Planner page</p>} />
          <Route path="/exercises" element={<p>Library page</p>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /start training/i }));
    expect(screen.getByText(/library page/i)).toBeInTheDocument();
  });

  test('opens the planner from the hero', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<p>Planner page</p>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getAllByRole('button', { name: /^plan your week$/i })[1]);
    expect(screen.getByText(/planner page/i)).toBeInTheDocument();
  });

  test('shows the last workout date and an already-planned notice', async () => {
    const user = userEvent.setup();
    saveToStorage(STORAGE_KEYS.WORKOUT_LOGS, [
      {
        id: 'log-home',
        date: '2026-09-01',
        exerciseName: 'Barbell Squat',
        sets: 3,
        reps: 8,
        weight: 60,
      },
    ]);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/tue, 1 sep/i)).toBeInTheDocument();
    await user.click(screen.getAllByRole('button', { name: /add to planner/i })[0]);
    await user.selectOptions(screen.getByLabelText(/choose a day/i), 'Tuesday');
    await user.click(screen.getByRole('button', { name: /add to tuesday/i }));
    await user.click(screen.getAllByRole('button', { name: /add to planner/i })[0]);
    await user.selectOptions(screen.getByLabelText(/choose a day/i), 'Tuesday');
    await user.click(screen.getByRole('button', { name: /keep on tuesday/i }));
    expect(screen.getByRole('status')).toHaveTextContent(
      /already on tuesday/i
    );
  });
});
