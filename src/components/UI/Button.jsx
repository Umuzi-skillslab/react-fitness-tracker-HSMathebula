import PropTypes from 'prop-types';
import styles from './UI.module.css';

function Button({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  disabled = false,
  ariaLabel,
}) {
  const className = `${styles.button} ${styles[variant] || styles.primary}`;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'accent']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

export default Button;
