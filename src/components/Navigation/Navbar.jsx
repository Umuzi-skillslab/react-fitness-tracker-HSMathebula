import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/exercises', label: 'Exercises' },
  { to: '/planner', label: 'Planner' },
  { to: '/history', label: 'History' },
  { to: '/progress', label: 'Progress' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Close the mobile drawer after a route change so it does not stay overlayed.
  const closeMenu = () => setIsOpen(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <header className={styles.header} onKeyDown={handleKeyDown}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.brand} onClick={closeMenu}>
          FitTrack
        </NavLink>

        <button
          type="button"
          className={styles.toggle}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>

        <nav
          className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}
          aria-label="Main"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
