import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddToPlanModal from './AddToPlanModal';

const exercise = { id: 2, name: 'Push-Up' };

describe('AddToPlanModal', () => {
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
});
