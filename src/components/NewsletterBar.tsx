import React, { useState } from 'react';
import './NewsletterBar.css';

interface NewsletterBarProps {
  isDarkMode?: boolean;
}

const NewsletterBar: React.FC<NewsletterBarProps> = ({ isDarkMode = false }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Simulate subscription
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className={`newsletter-bar ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="newsletter-container">
        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="newsletter-form">
            <span className="newsletter-text">📧 Subscribe to our newsletter for the latest tech insights</span>
            <div className="newsletter-input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </div>
          </form>
        ) : (
          <div className="newsletter-success">
            <span>✅ Thank you for subscribing! Check your email for confirmation.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterBar;
