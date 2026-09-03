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
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (event) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event) => {
    setIsFocused(false);
    onBlur?.(event);
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
