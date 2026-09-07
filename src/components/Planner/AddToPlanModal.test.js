import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddToPlanModal from './AddToPlanModal';
import { STORAGE_KEYS, createEmptyPlan, saveToStorage } from '../../utils/helpers';

const exercise = { id: 2, name: 'Push-Up' };

describe('AddToPlanModal', () => {
  test('renders nothing without an exercise', () => {
    const { container } = render(
      <AddToPlanModal exercise={null} onClose={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });
  test('adds the selected exercise to a day', async () => {
    const user = userEvent.setup();
    const handleAdded = jest.fn();
    const handleClose = jest.fn();

    render(
      <AddToPlanModal
        exercise={exercise}
        onClose={handleClose}
        onAdded={handleAdded}
      />
    );

    await user.selectOptions(screen.getByLabelText(/choose a day/i), 'Friday');
    await user.click(screen.getByRole('button', { name: /add to friday/i }));

    expect(handleAdded).toHaveBeenCalledWith(
      exercise,
      'Friday',
      expect.objectContaining({ exists: false })
    );
    expect(handleClose).toHaveBeenCalled();
  });

  test('warns when the exercise is already planned that day', async () => {
    const user = userEvent.setup();
    const handleAdded = jest.fn();

    saveToStorage(STORAGE_KEYS.WEEKLY_PLAN, {
      ...createEmptyPlan(),
      Friday: [{ id: 2, name: 'Push-Up' }],
    });

    render(
      <AddToPlanModal
        exercise={exercise}
        onClose={jest.fn()}
        onAdded={handleAdded}
      />
    );

    await user.selectOptions(screen.getByLabelText(/choose a day/i), 'Friday');
    expect(screen.getByText(/already on friday/i)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /keep on friday/i }));
    expect(handleAdded).toHaveBeenCalledWith(
      exercise,
      'Friday',
      expect.objectContaining({ exists: true })
    );
  });
});
