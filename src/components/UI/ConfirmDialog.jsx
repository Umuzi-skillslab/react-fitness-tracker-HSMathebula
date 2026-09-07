import PropTypes from 'prop-types';
import Button from './Button';
import Modal from './Modal';
import styles from './UI.module.css';

function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Yes, delete',
  onConfirm,
  onClose,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="28rem">
      <p>{message}</p>
      <div className={styles.modalActions}>
        <Button variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ConfirmDialog;
