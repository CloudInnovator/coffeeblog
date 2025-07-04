import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Dot Product</h3>
            <p>Independent tech journalism focused on engineering advances at FAANG companies and beyond. Support our writers with coffee subscriptions.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/blog">Tech Blog</a></li>
              <li><a href="/subscriptions">Support Authors</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support Options</h4>
            <ul>
              <li>Weekly Support</li>
              <li>Monthly Support</li>
              <li>Annual Patron</li>
              <li>One-time Support</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>Email: hello@designdot.coffee</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Dot Product. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
