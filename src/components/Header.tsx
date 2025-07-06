import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>Dot Product</h1>
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Home</Link></li>
            <li><Link to="/blog" className="nav-link">Blog</Link></li>
            <li><Link to="/about" className="nav-link">About</Link></li>
            <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
          </ul>
          <Link to="/subscriptions" className="buy-coffee-btn">Buy Me Coffee ☕</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
