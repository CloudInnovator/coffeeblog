import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode = false, toggleDarkMode }) => {
  return (
    <header className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="logo">
          <Link to="/blog">
            <h1>Dot Product</h1>
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li><Link to="/blog" className="nav-link">Blog</Link></li>
            <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
            <li><Link to="/contact" className="nav-link">Contact</Link></li>
          </ul>
          <div className="nav-buttons">
            <Link to="/donations" className="buy-coffee-btn">Buy Me Coffee ☕</Link>
            <Link to="/subscriptions" className="subscription-btn">Subscribe</Link>
            {toggleDarkMode && (
              <button 
                className="dark-mode-toggle nav-toggle"
                onClick={toggleDarkMode}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
