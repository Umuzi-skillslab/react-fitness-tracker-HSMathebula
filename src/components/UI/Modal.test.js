import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
  test('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()} title="Details">
        Hidden content
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders children and closes from the icon button', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();

    render(
      <Modal isOpen onClose={handleClose} title="Push-Up">
        Keep a straight line from head to heels.
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/straight line/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close modal/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
