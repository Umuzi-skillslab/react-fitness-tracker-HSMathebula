import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../../pages/pages.module.css';

function Toast({ message, onClear, duration = 4000 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!message) {
      return undefined;
    }

    ref.current?.scrollIntoView?.({ block: 'nearest' });
    const timer = window.setTimeout(onClear, duration);
    return () => window.clearTimeout(timer);
  }, [message, duration, onClear]);

  if (!message) {
    return null;
  }

  return (
    <p ref={ref} className={styles.notice} role="status" aria-live="polite">
      {message}
    </p>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  onClear: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

export default Toast;
