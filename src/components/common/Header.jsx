import PropTypes from 'prop-types';
import styles from './common.module.css';

function Header({ title, subtitle, children, align = 'left' }) {
  return (
    <header className={`${styles.header} ${styles[align] || styles.left}`}>
      <h1>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      {children}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

export default Header;
