import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  test('renders a title and children content', () => {
    render(
      <Card title="Barbell Squat">
        <p>Lower until thighs are parallel.</p>
      </Card>
    );

    expect(screen.getByRole('heading', { name: /barbell squat/i })).toBeInTheDocument();
    expect(screen.getByText(/thighs are parallel/i)).toBeInTheDocument();
  });
});
