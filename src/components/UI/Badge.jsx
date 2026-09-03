import PropTypes from 'prop-types';
import styles from './UI.module.css';

const DIFFICULTY_COLORS = {
  Beginner: '#2a9d8f',
  Intermediate: '#c59212',
  Advanced: '#c1121f',
};

function Badge({ label = 'General', difficulty, isActive = false }) {
  const badgeClass = `${styles.badge} ${isActive ? styles.badgeActive : ''}`;
  const tone = DIFFICULTY_COLORS[difficulty] || '#5c6f68';

  return (
    <span className={badgeClass} style={{ backgroundColor: tone, color: '#fff' }}>
      {label}
    </span>
  );
}

Badge.propTypes = {
  label: PropTypes.string,
  difficulty: PropTypes.string,
  isActive: PropTypes.bool,
};

export default Badge;
