import PropTypes from 'prop-types';
import styles from './UI.module.css';

const DIFFICULTY_CLASS = {
  Beginner: styles.beginner,
  Intermediate: styles.intermediate,
  Advanced: styles.advanced,
};

function Badge({ label = 'General', difficulty, isActive = false }) {
  const tone = DIFFICULTY_CLASS[difficulty] || styles.neutral;
  const badgeClass = `${styles.badge} ${tone} ${isActive ? styles.badgeActive : ''}`;

  return <span className={badgeClass}>{label}</span>;
}

Badge.propTypes = {
  label: PropTypes.string,
  difficulty: PropTypes.string,
  isActive: PropTypes.bool,
};

export default Badge;
