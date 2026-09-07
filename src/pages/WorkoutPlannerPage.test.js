import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
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
});
