import PropTypes from 'prop-types';
import styles from './common.module.css';

function Footer({ year = new Date().getFullYear(), brand = 'FitTrack' }) {
  return (
    <footer className={styles.footer}>
      <p>
        © {year} {brand}.{' '}
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          Built with React
        </a>
      </p>
    </footer>
  );
}

Footer.propTypes = {
  year: PropTypes.number,
  brand: PropTypes.string,
};

export default Footer;
