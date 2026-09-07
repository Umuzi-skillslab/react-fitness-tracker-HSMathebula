import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  test('renders children and calls onClick', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Save workout</Button>);

    await user.click(screen.getByRole('button', { name: /save workout/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('uses the secondary variant without becoming disabled', () => {
    render(
      <Button variant="secondary" disabled={false}>
        Filter
      </Button>
    );

    expect(screen.getByRole('button', { name: /filter/i })).toBeEnabled();
  });

  test('falls back to the primary style for an unknown variant', () => {
    render(<Button variant="mystery">Go</Button>);
    expect(screen.getByRole('button', { name: /go/i })).toBeInTheDocument();
  });
});
