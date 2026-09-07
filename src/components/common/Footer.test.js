import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  test('renders the brand and year', () => {
    render(<Footer year={2026} brand="FitTrack" />);

    expect(screen.getByText(/© 2026 FitTrack/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /built with react/i })).toHaveAttribute(
      'href',
      'https://react.dev'
    );
  });
});
