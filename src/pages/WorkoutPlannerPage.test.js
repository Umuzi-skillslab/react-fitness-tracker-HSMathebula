import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import WorkoutPlannerPage from './WorkoutPlannerPage';

describe('WorkoutPlannerPage', () => {
  test('adds an exercise from the catalog to a day', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <WorkoutPlannerPage />
      </MemoryRouter>
    );

    await user.selectOptions(screen.getByLabelText(/planner day/i), 'Thursday');
    await user.selectOptions(screen.getByLabelText(/planner exercise/i), '2');
    await user.click(screen.getByRole('button', { name: /add to day/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/added push-up to thursday/i);
    expect(screen.getByText('1 exercise')).toBeInTheDocument();
    expect(screen.getByLabelText(/remove push-up from thursday/i)).toBeInTheDocument();
  });

  test('opens the library from the empty-week callout', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<WorkoutPlannerPage />} />
          <Route path="/exercises" element={<p>Library page</p>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /browse exercises/i }));
    expect(screen.getByText(/library page/i)).toBeInTheDocument();
  });

  test('asks the user to choose an exercise before adding', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <WorkoutPlannerPage />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /add to day/i }));
    expect(screen.getByRole('status')).toHaveTextContent(/choose an exercise to add/i);
  });

  test('opens history to log a planned exercise', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/planner']}>
        <App />
      </MemoryRouter>
    );

    await user.selectOptions(screen.getByLabelText(/planner exercise/i), '2');
    await user.click(screen.getByRole('button', { name: /add to day/i }));
    await user.click(screen.getByRole('button', { name: /log push-up from monday/i }));
    expect(screen.getByRole('heading', { name: /workout history/i })).toBeInTheDocument();
  });

  test('opens the library from the toolbar after a day has work', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<WorkoutPlannerPage />} />
          <Route path="/exercises" element={<p>Library page</p>} />
        </Routes>
      </MemoryRouter>
    );

    await user.selectOptions(screen.getByLabelText(/planner exercise/i), '2');
    await user.click(screen.getByRole('button', { name: /add to day/i }));
    await user.click(screen.getByRole('button', { name: /browse exercises/i }));
    expect(screen.getByText(/library page/i)).toBeInTheDocument();
  });
});
