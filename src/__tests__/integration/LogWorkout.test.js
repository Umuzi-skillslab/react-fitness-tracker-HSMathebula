import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

describe('log-workout flow', () => {
  test('logs a workout and shows it on progress', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/history']}>
        <App />
      </MemoryRouter>
    );

    await user.selectOptions(screen.getByLabelText(/exercise to log/i), '1');
    await user.clear(screen.getByLabelText(/^sets$/i));
    await user.type(screen.getByLabelText(/^sets$/i), '3');
    await user.clear(screen.getByLabelText(/^reps$/i));
    await user.type(screen.getByLabelText(/^reps$/i), '8');
    await user.clear(screen.getByLabelText(/weight in kilograms/i));
    await user.type(screen.getByLabelText(/weight in kilograms/i), '60');
    await user.click(screen.getByRole('button', { name: /log workout/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/logged barbell squat/i);
    expect(screen.getByText(/3 sets × 8 reps/i)).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /^progress$/i }));
    expect(screen.getAllByText(/1440/).length).toBeGreaterThan(0);
    expect(screen.getByRole('img', { name: /daily workout volume/i })).toBeInTheDocument();
  });
});
