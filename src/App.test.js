import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders the fitness tracker heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /fitness tracker/i })
    ).toBeInTheDocument();
  });
});
