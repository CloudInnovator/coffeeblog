import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
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
            <button className="newsletter-btn">Newsletter 📧</button>
            <Link to="/subscriptions" className="buy-coffee-btn">Buy Me Coffee ☕</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
