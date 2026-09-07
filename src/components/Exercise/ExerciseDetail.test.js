import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExerciseDetail from './ExerciseDetail';

const exercise = {
  id: 1,
  name: 'Barbell Squat',
  category: 'Strength',
  muscleGroup: 'Legs',
  difficulty: 'Intermediate',
  instructions: [
    'Stand with feet shoulder-width apart.',
    'Sit your hips back and down.',
  ],
};

describe('ExerciseDetail', () => {
  test('renders full form instructions', () => {
    render(
      <ExerciseDetail
        exercise={exercise}
        onAddToPlan={jest.fn()}
        onBack={jest.fn()}
      />
    );

    expect(screen.getByRole('heading', { name: /barbell squat/i })).toBeInTheDocument();
    expect(screen.getByText(/hips back and down/i)).toBeInTheDocument();
  });

  test('opens the checklist modal', async () => {
    const user = userEvent.setup();

    render(
      <ExerciseDetail
        exercise={exercise}
        onAddToPlan={jest.fn()}
        onBack={jest.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: /open checklist/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/step 1:/i)).toBeInTheDocument();
  });

  test('sends the exercise to the planner callback', async () => {
    const user = userEvent.setup();
    const handleAdd = jest.fn();
    const handleBack = jest.fn();

    render(
      <ExerciseDetail
        exercise={exercise}
        onAddToPlan={handleAdd}
        onBack={handleBack}
      />
    );

    await user.click(screen.getByRole('button', { name: /add to planner/i }));
    await user.click(screen.getByRole('button', { name: /back to library/i }));

    expect(handleAdd).toHaveBeenCalledWith(exercise);
    expect(handleBack).toHaveBeenCalled();
  });
});
