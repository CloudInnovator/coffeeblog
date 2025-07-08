import React from 'react';
import './Footer.css';

interface FooterProps {
  isDarkMode?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isDarkMode = false }) => {
  return (
    <footer className={`footer ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="footer-bottom">
          <p>&copy; 2025 Dot Product. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
