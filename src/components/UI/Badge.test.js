import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  test('renders the default label', () => {
    render(<Badge />);
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  test('renders a difficulty badge', () => {
    render(<Badge label="Beginner" difficulty="Beginner" isActive />);
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });
});
