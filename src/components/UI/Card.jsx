import PropTypes from 'prop-types';
import styles from './UI.module.css';

function Card({
  children,
  title,
  elevated = true,
  padding = '1.5rem',
  isSelected = false,
  onClick,
}) {
  const className = `${styles.card} ${elevated ? styles.elevated : styles.flat} ${
    isSelected ? styles.selected : ''
  }`;

  return (
    <article
      className={className}
      style={{ '--card-padding': padding }}
      onClick={onClick}
    >
      {title ? <h3 className={styles.cardTitle}>{title}</h3> : null}
      {children}
    </article>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  elevated: PropTypes.bool,
  padding: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
