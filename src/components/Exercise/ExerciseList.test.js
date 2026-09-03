import { render, screen } from '@testing-library/react';
import ExerciseList from './ExerciseList';

const exercises = [
  {
    id: 1,
    name: 'Barbell Squat',
    category: 'Strength',
    muscleGroup: 'Legs',
    difficulty: 'Intermediate',
    instructions: ['Stand with feet shoulder-width apart.'],
  },
  {
    id: 2,
    name: 'Push-Up',
    category: 'Strength',
    muscleGroup: 'Chest',
    difficulty: 'Beginner',
    instructions: ['Place your hands slightly wider than shoulder-width.'],
  },
];

describe('ExerciseList', () => {
  test('renders a card for each exercise', () => {
    render(<ExerciseList exercises={exercises} onSelect={jest.fn()} />);

    expect(screen.getByRole('heading', { name: /barbell squat/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /push-up/i })).toBeInTheDocument();
  });

  test('shows an empty state when there are no exercises', () => {
    render(
      <ExerciseList
        exercises={[]}
        onSelect={jest.fn()}
        emptyMessage="Nothing to show."
      />
    );

    expect(screen.getByText(/nothing to show/i)).toBeInTheDocument();
  });
});
