import { render, screen } from '@testing-library/react';
import WorkoutPlanner from './WorkoutPlanner';

describe('WorkoutPlanner', () => {
  test('renders a card for every weekday', () => {
    render(<WorkoutPlanner plan={{}} onRemove={jest.fn()} />);

    expect(screen.getByRole('heading', { name: /monday/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /sunday/i })).toBeInTheDocument();
    expect(screen.getAllByText(/no exercises planned/i)).toHaveLength(7);
  });
});
