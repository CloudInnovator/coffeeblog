import React, { useState } from 'react';
import './Subscriptions.css';

const Subscriptions: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleQuickBuy = (amount: string) => {
    // Simulate payment processing
    alert(`Thank you for buying me a ${amount} coffee! ☕`);
  };

  const handleSubscription = (plan: string) => {
    setSelectedPlan(plan);
    // Simulate subscription setup
    alert(`Thank you for subscribing to ${plan}! You'll be redirected to payment setup.`);
  };

  return (
    <div className="subscriptions">
      <div className="container">
        <div className="subscriptions-header">
          <h1 className="subscription-title">☕ Support Dot Product</h1>
          <p className="subscription-subtitle">Help us create amazing tech content with your coffee support!</p>
        </div>

        {/* Unified Coffee Support Section */}
        <section className="coffee-support">
          <div className="support-intro">
            <h2>Fuel Our Tech Journalism with Coffee</h2>
            <p>Choose your way to support our independent tech content - one cup at a time or with monthly deliveries!</p>
          </div>
          
          {/* One-Time Coffee Support */}
          <div className="support-section">
            <h3>🚀 One-Time Coffee Support</h3>
            <div className="coffee-grid">
              <button 
                className="coffee-card quick-coffee" 
                onClick={() => handleQuickBuy('$3')}
              >
                <div className="coffee-icon">☕</div>
                <div className="coffee-amount">$3</div>
                <div className="coffee-label">Quick Espresso</div>
                <div className="coffee-desc">One-time support</div>
              </button>
              
              <button 
                className="coffee-card quick-coffee featured" 
                onClick={() => handleQuickBuy('$5')}
              >
                <div className="coffee-icon">☕☕</div>
                <div className="coffee-amount">$5</div>
                <div className="coffee-label">Double Shot</div>
                <div className="coffee-desc">Most popular</div>
                <div className="popular-badge">⭐ Popular</div>
              </button>
              
              <button 
                className="coffee-card quick-coffee" 
                onClick={() => handleQuickBuy('$10')}
              >
                <div className="coffee-icon">☕🍰</div>
                <div className="coffee-amount">$10</div>
                <div className="coffee-label">Coffee & Pastry</div>
                <div className="coffee-desc">Extra generous</div>
              </button>
              
              <button 
                className="coffee-card quick-coffee custom" 
                onClick={() => {
                  const amount = prompt('Enter your custom coffee amount ($):');
                  if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
                    handleQuickBuy(`$${amount}`);
                  }
                }}
              >
                <div className="coffee-icon">💝</div>
                <div className="coffee-amount">Custom</div>
                <div className="coffee-label">Your Choice</div>
                <div className="coffee-desc">Any amount</div>
              </button>
            </div>
          </div>

          {/* Monthly Coffee Subscriptions */}
          <div className="support-section">
            <h3>🔄 Monthly Coffee Subscriptions</h3>
            <p className="section-desc">Get premium coffee delivered monthly while supporting our content!</p>
            <div className="coffee-grid">
              <button 
                className="coffee-card subscription-coffee" 
                onClick={() => handleSubscription('Monthly Espresso')}
              >
                <div className="coffee-icon">☕</div>
                <div className="coffee-amount">$5</div>
                <div className="coffee-label">Monthly Espresso</div>
                <div className="coffee-desc">Basic support</div>
              </button>
              
              <button 
                className="coffee-card subscription-coffee featured" 
                onClick={() => handleSubscription('Daily Brew')}
              >
                <div className="coffee-icon">☕☕</div>
                <div className="coffee-amount">$10</div>
                <div className="coffee-label">Daily Brew</div>
                <div className="coffee-desc">Best value</div>
                <div className="popular-badge">🏆 Best Value</div>
              </button>
              
              <button 
                className="coffee-card subscription-coffee premium" 
                onClick={() => handleSubscription('Coffee Connoisseur')}
              >
                <div className="coffee-icon">☕🥐</div>
                <div className="coffee-amount">$25</div>
                <div className="coffee-label">Coffee Connoisseur</div>
                <div className="coffee-desc">Premium blend</div>
              </button>
            </div>
          </div>

          {/* Coffee Community Section */}
          <div className="coffee-community">
            <h3>☕ Join the Coffee Community</h3>
            <div className="community-grid">
              <div className="community-card">
                <div className="community-icon">💻</div>
                <h4>GitHub Sponsorship</h4>
                <p>Sponsor our open-source coffee fund through GitHub</p>
                <button className="community-btn">Sponsor ☕</button>
              </div>
              <div className="community-card">
                <div className="community-icon">📢</div>
                <h4>Spread the Love</h4>
                <p>Share our articles with fellow developers</p>
                <button className="community-btn">Share ☕</button>
              </div>
              <div className="community-card">
                <div className="community-icon">💡</div>
                <h4>Suggest Topics</h4>
                <p>Tell us what tech topics you'd like us to cover</p>
                <button className="community-btn">Suggest ☕</button>
              </div>
            </div>
          </div>

          {/* Thank You Section */}
          <div className="coffee-thank-you">
            <div className="thank-you-content">
              <div className="coffee-heart">☕❤️</div>
              <h3>Thank You for Fueling Our Content!</h3>
              <p>
                Every coffee you buy helps us stay caffeinated and creates better tech journalism. 
                Your support keeps our content independent, high-quality, and accessible to everyone in the developer community.
              </p>
              <div className="coffee-stats">
                <div className="stat">
                  <div className="stat-number">1,234</div>
                  <div className="stat-label">Coffees this month</div>
                </div>
                <div className="stat">
                  <div className="stat-number">42</div>
                  <div className="stat-label">Articles published</div>
                </div>
                <div className="stat">
                  <div className="stat-number">5,678</div>
                  <div className="stat-label">Developers reading</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Subscriptions;
