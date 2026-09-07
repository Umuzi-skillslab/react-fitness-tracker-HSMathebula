import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

function Modal({
  isOpen,
  onClose,
  title = 'Details',
  children,
  maxWidth = '32rem',
}) {
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  const getFocusable = () =>
    dialogRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

  const handleKeyDown = (event) => {
    // Escape closes the dialog; Tab cycles inside it instead of the page behind.
    if (event.key === 'Escape') {
      onClose();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusable = getFocusable();
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    if (!first || !last) {
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    previouslyFocused.current = document.activeElement;
    getFocusable()?.[0]?.focus();

    return () => {
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    // Ignore clicks on the dialog itself so selecting text does not close it.
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        style={{ '--modal-max-width': maxWidth }}
      >
        <div className={styles.modalHeader}>
          <h2 id="modal-title">{title}</h2>
          <button
            type="button"
            className={styles.iconButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  maxWidth: PropTypes.string,
};

export default Modal;
