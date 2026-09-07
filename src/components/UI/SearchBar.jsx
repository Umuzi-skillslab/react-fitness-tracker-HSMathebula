import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

function SearchBar({
  value,
  onChange,
  placeholder = 'Search exercises...',
  onFocus,
  onBlur,
}) {
  // Local focus state drives the ring; the parent still owns the query string.
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleKeyDown = (event) => {
    // Escape clears the controlled query so the parent list can reset.
    if (event.key === 'Escape' && value) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <label className={`${styles.search} ${isFocused ? styles.searchFocused : ''}`}>
      <span className={styles.visuallyHidden}>Search</span>
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    </label>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default SearchBar;
