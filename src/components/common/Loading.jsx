import PropTypes from 'prop-types';
import styles from './common.module.css';

function Loading({ message = 'Loading...', isOverlay = false, size = 36 }) {
  return (
    <div
      className={`${styles.loading} ${isOverlay ? styles.loadingOverlay : ''}`}
      role="status"
      aria-live="polite"
    >
      <span
        className={styles.spinner}
        style={{ '--spinner-size': `${size}px` }}
      />
      <p>{message}</p>
    </div>
  );
}

Loading.propTypes = {
  message: PropTypes.string,
  isOverlay: PropTypes.bool,
  size: PropTypes.number,
};

export default Loading;
