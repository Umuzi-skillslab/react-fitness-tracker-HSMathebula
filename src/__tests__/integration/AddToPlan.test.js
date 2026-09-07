import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

describe('add-to-plan flow', () => {
  test('adds an exercise from the library to a weekday', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/exercises']}>
        <App />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole('heading', { name: /barbell squat/i })
    ).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /add to planner/i })[0]);
    await user.selectOptions(screen.getByLabelText(/choose a day/i), 'Wednesday');
    await user.click(screen.getByRole('button', { name: /add to wednesday/i }));

    expect(screen.getByRole('status')).toHaveTextContent(
      /added barbell squat to wednesday/i
    );

    await user.click(screen.getByRole('link', { name: /^planner$/i }));
    expect(screen.getByRole('heading', { name: /wednesday/i })).toBeInTheDocument();
    expect(
      screen.getByLabelText(/remove barbell squat from wednesday/i)
    ).toBeInTheDocument();
  });

  test('notifies when the library exercise is already on that day', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/exercises']}>
        <App />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole('heading', { name: /barbell squat/i })
    ).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /add to planner/i })[0]);
    await user.selectOptions(screen.getByLabelText(/choose a day/i), 'Wednesday');
    await user.click(screen.getByRole('button', { name: /add to wednesday/i }));

    await user.click(screen.getAllByRole('button', { name: /add to planner/i })[0]);
    await user.selectOptions(screen.getByLabelText(/choose a day/i), 'Wednesday');
    await user.click(screen.getByRole('button', { name: /keep on wednesday/i }));

    expect(screen.getByRole('status')).toHaveTextContent(
      /already on wednesday/i
    );
  });
});
