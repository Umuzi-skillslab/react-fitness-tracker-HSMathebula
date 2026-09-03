import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExerciseCard from './ExerciseCard';

const exercise = {
  id: 2,
  name: 'Push-Up',
  category: 'Strength',
  muscleGroup: 'Chest',
  difficulty: 'Beginner',
  instructions: ['Place your hands slightly wider than shoulder-width.'],
};

describe('ExerciseCard', () => {
  test('renders exercise props and preview text', () => {
    render(<ExerciseCard exercise={exercise} onSelect={jest.fn()} />);

    expect(screen.getByRole('heading', { name: /push-up/i })).toBeInTheDocument();
    expect(screen.getByText(/beginner/i)).toBeInTheDocument();
    expect(screen.getByText(/shoulder-width/i)).toBeInTheDocument();
  });

  test('sends the exercise to parent handlers', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();
    const handleAdd = jest.fn();

    render(
      <ExerciseCard
        exercise={exercise}
        onSelect={handleSelect}
        onAddToPlan={handleAdd}
      />
    );

    await user.click(screen.getByRole('button', { name: /view details/i }));
    await user.click(screen.getByRole('button', { name: /add to planner/i }));

    expect(handleSelect).toHaveBeenCalledWith(exercise);
    expect(handleAdd).toHaveBeenCalledWith(exercise);
  });
});
