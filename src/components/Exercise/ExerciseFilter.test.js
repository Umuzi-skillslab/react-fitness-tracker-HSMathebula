import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExerciseFilter from './ExerciseFilter';

const props = {
  filters: {
    category: '',
    muscleGroup: '',
    difficulty: '',
    sortBy: 'name',
  },
  categories: ['Cardio', 'Strength'],
  muscleGroups: ['Chest', 'Legs'],
  difficulties: ['Beginner', 'Advanced'],
};

describe('ExerciseFilter', () => {
  test('notifies the parent when a filter changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <ExerciseFilter
        {...props}
        onFilterChange={handleChange}
        onReset={jest.fn()}
      />
    );

    await user.selectOptions(screen.getByLabelText(/filter by category/i), 'Cardio');
    expect(handleChange).toHaveBeenCalledWith({
      ...props.filters,
      category: 'Cardio',
    });
  });

  test('resets filters from the parent callback', async () => {
    const user = userEvent.setup();
    const handleReset = jest.fn();

    render(
      <ExerciseFilter {...props} onFilterChange={jest.fn()} onReset={handleReset} />
    );

    await user.click(screen.getByRole('button', { name: /reset filters/i }));
    expect(handleReset).toHaveBeenCalledTimes(1);
  });
});
