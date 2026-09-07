import { render, screen } from '@testing-library/react';
import ProgressChart from './ProgressChart';

describe('ProgressChart', () => {
  test('shows an empty message when there are no logs', () => {
    render(<ProgressChart logs={[]} />);
    expect(screen.getByText(/log a workout to see daily volume/i)).toBeInTheDocument();
  });

  test('renders daily volume bars', () => {
    render(
      <ProgressChart
        logs={[
          { date: '2026-09-01', sets: 3, reps: 10, weight: 20 },
          { date: '2026-09-02', sets: 2, reps: 8, weight: 15 },
        ]}
      />
    );

    expect(screen.getByRole('img', { name: /daily workout volume/i })).toBeInTheDocument();
    expect(screen.getByText('600')).toBeInTheDocument();
    expect(screen.getByText('240')).toBeInTheDocument();
  });
});
