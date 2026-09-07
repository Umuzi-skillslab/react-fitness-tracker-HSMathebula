import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  test('renders a status message', () => {
    render(<Loading message="Loading exercise catalog..." isOverlay size={40} />);
    expect(screen.getByRole('status')).toHaveTextContent(/loading exercise catalog/i);
  });

  test('renders the default message without an overlay', () => {
    render(<Loading />);
    expect(screen.getByRole('status')).toHaveTextContent(/loading/i);
  });
});
