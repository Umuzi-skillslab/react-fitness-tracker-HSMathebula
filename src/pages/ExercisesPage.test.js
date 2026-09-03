import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ExercisesPage from './ExercisesPage';

describe('ExercisesPage', () => {
  test('filters the catalog after it finishes loading', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ExercisesPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading exercise catalog/i)).toBeInTheDocument();

    expect(
      await screen.findByRole('heading', { name: /jump rope/i })
    ).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(/filter by category/i), 'Cardio');

    expect(screen.getByRole('heading', { name: /jump rope/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /barbell squat/i })
    ).not.toBeInTheDocument();
  });

  test('shows an empty state when search has no matches', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ExercisesPage />
      </MemoryRouter>
    );

    const search = await screen.findByRole('searchbox');
    await user.type(search, 'xyz-no-match');

    expect(await screen.findByText(/no exercises match/i)).toBeInTheDocument();
  });
});
