import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('renders a title, subtitle, and children', () => {
    render(
      <Header title="Exercise Library" subtitle="12 movements" align="center">
        <p>Browse the catalog.</p>
      </Header>
    );

    expect(screen.getByRole('heading', { name: /exercise library/i })).toBeInTheDocument();
    expect(screen.getByText(/12 movements/i)).toBeInTheDocument();
    expect(screen.getByText(/browse the catalog/i)).toBeInTheDocument();
  });

  test('renders without a subtitle and falls back for unknown align', () => {
    render(<Header title="FitTrack" align="wide" />);

    expect(screen.getByRole('heading', { name: /fittrack/i })).toBeInTheDocument();
    expect(screen.queryByText(/movements/i)).not.toBeInTheDocument();
  });
});
