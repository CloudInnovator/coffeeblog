import React, { useState, useEffect } from 'react';
import './Subscriptions.css';

interface SubscriptionsProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Subscriptions: React.FC<SubscriptionsProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check for email query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
      setShowCategorySelection(true);
    }
  }, []);

  const categories = [
    'Design Systems',
    'Engineering', 
    'Architecture',
    'Performance',
    'AI/ML',
    'UI/UX',
    'Trends',
    'All Categories'
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setShowCategorySelection(true);
    }
  };

  const handleCategoryToggle = (category: string) => {
    if (category === 'All Categories') {
      setSelectedCategories(selectedCategories.includes('All Categories') ? [] : ['All Categories']);
    } else {
      setSelectedCategories(prev => {
        const newCategories = prev.filter(cat => cat !== 'All Categories');
        return prev.includes(category)
          ? newCategories.filter(cat => cat !== category)
          : [...newCategories, category];
      });
    }
  };

  const handleSubscribe = () => {
    if (selectedCategories.length > 0) {
      const subscriptionData = {
        email,
        categories: selectedCategories,
        subscribedAt: new Date().toISOString()
      };
      
      const existingSubscriptions = JSON.parse(localStorage.getItem('emailSubscriptions') || '[]');
      const updatedSubscriptions = [...existingSubscriptions, subscriptionData];
      localStorage.setItem('emailSubscriptions', JSON.stringify(updatedSubscriptions));
      
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
        setSelectedCategories([]);
        setShowCategorySelection(false);
      }, 3000);
    }
  };

  if (isSubscribed) {
    return (
      <div className={`subscriptions ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="container">
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h2>Successfully Subscribed!</h2>
            <p>Thank you for subscribing to our tech insights. You'll receive notifications for:</p>
            <ul className="subscribed-categories">
              {selectedCategories.map(category => (
                <li key={category}>{category}</li>
              ))}
            </ul>
            <p>Check your email for confirmation.</p>
          </div>
        </div>
      </div>
    );
  }

  if (showCategorySelection) {
    return (
      <div className={`subscriptions ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="container">
          <div className="category-selection">
            <h2>Choose Your Interests</h2>
            <p>Select the categories you'd like to receive notifications about:</p>
            <div className="email-display">
              <span>Subscribing: {email}</span>
              <button 
                className="edit-email-btn"
                onClick={() => setShowCategorySelection(false)}
              >
                Edit Email
              </button>
            </div>
            
            <div className="categories-grid">
              {categories.map(category => (
                <label key={category} className="category-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                  />
                  <span className="category-label">{category}</span>
                </label>
              ))}
            </div>
            
            <div className="subscription-actions">
              <button
                className="subscribe-btn"
                onClick={handleSubscribe}
                disabled={selectedCategories.length === 0}
              >
                Subscribe to Selected Categories
              </button>
              <button
                className="back-btn"
                onClick={() => setShowCategorySelection(false)}
              >
                Back to Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`subscriptions ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="subscription-form">
          <div className="subscription-header">
            <h1>Stay Updated with Tech Insights</h1>
            <p>Get notified when we publish new analysis and insights on design systems, engineering practices, and emerging tech trends.</p>
          </div>
          
          <form onSubmit={handleEmailSubmit} className="email-form">
            <div className="email-input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="email-input"
                required
              />
              <button type="submit" className="continue-btn">
                Continue →
              </button>
            </div>
          </form>
          
          <div className="subscription-benefits">
            <h3>What you'll get:</h3>
            <ul>
              <li>📧 Email notifications for new publications</li>
              <li>🎯 Customized content based on your interests</li>
              <li>🚀 Early access to in-depth technical analysis</li>
              <li>💡 Insights on design systems and engineering practices</li>
              <li>🔄 Unsubscribe anytime</li>
            </ul>
          </div>
          
          <div className="privacy-note">
            <p>We respect your privacy. Your email will only be used for publication notifications and you can unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
