import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onClearSearch?: () => void;
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode = false, 
  toggleDarkMode,
  searchQuery = "",
  onSearchChange,
  onClearSearch,
  showSearch = false
}) => {
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail.trim()) return;

    setIsSubscribing(true);
    setSubscribeMessage("");

    try {
      // Simulate subscription process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store subscription data in localStorage
      const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
      const newSubscription = {
        email: subscribeEmail,
        categories: ['All'], // Default category
        date: new Date().toISOString(),
        id: Date.now()
      };
      subscriptions.push(newSubscription);
      localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
      
      setSubscribeMessage("Successfully subscribed! 🎉");
      setSubscribeEmail("");
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubscribeMessage(""), 3000);
    } catch (error) {
      setSubscribeMessage("Subscription failed. Please try again.");
      setTimeout(() => setSubscribeMessage(""), 3000);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  const clearSearch = () => {
    if (onClearSearch) {
      onClearSearch();
    }
  };
  return (
    <header className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="header-left">
          <div className="logo">
            <Link to="/blog">
              <h1>Dot Product</h1>
            </Link>
          </div>
          
          <nav className="nav-left">
            <ul className="nav-list">
              <li><Link to="/blog" className="nav-link">Blog</Link></li>
              <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
              <li><Link to="/contact" className="nav-link">Contact</Link></li>
            </ul>
          </nav>
        </div>

        <div className="header-center">
          {showSearch && (
            <div className="header-search">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="header-search-input"
                />
                {searchQuery && (
                  <button 
                    className="clear-search-btn"
                    onClick={clearSearch}
                    title="Clear search"
                  >
                    ×
                  </button>
                )}
                <div className="search-icon">🔍</div>
              </div>
            </div>
          )}
          
          <div className="subscription-component">
            <form onSubmit={handleSubscribeSubmit} className="subscribe-form">
              <div className="email-input-container">
                <input
                  type="email"
                  placeholder="Enter your email to subscribe..."
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className="subscribe-email-input"
                  disabled={isSubscribing}
                />
                <button 
                  type="submit"
                  className="subscribe-submit-btn"
                  disabled={!subscribeEmail.trim() || isSubscribing}
                >
                  {isSubscribing ? '⏳' : 'Subscribe'}
                </button>
              </div>
            </form>
            {subscribeMessage && (
              <div className={`subscribe-message ${subscribeMessage.includes('Successfully') ? 'success' : 'error'}`}>
                {subscribeMessage}
              </div>
            )}
          </div>
        </div>

        <div className="header-right">
          <Link to="/donations" className="buy-coffee-btn">Buy Me Coffee ☕</Link>
          
          {toggleDarkMode && (
            <button 
              className="dark-mode-toggle"
              onClick={toggleDarkMode}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
