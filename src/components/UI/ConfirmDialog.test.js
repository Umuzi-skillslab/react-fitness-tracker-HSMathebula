import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmDialog from './ConfirmDialog';

describe('ConfirmDialog', () => {
  test('uses the default confirm label and reports both actions', async () => {
    const user = userEvent.setup();
    const handleConfirm = jest.fn();
    const handleClose = jest.fn();

    render(
      <ConfirmDialog
        isOpen
        title="Delete this log?"
        message="This cannot be undone."
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    );

    expect(screen.getByRole('button', { name: /yes, delete/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /yes, delete/i }));
    expect(handleConfirm).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(handleClose).toHaveBeenCalled();
  });
});
