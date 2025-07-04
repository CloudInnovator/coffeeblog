import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <main className="main-content">
        <section className="hero">
          <div className="container">
            <h1>Stay Ahead of the Tech Curve</h1>
            <p>Get exclusive insights, in-depth analysis, and premium content from industry experts. Join thousands of tech professionals who trust Dot Product for their daily dose of innovation.</p>
            <div className="hero-buttons">
              <Link to="/subscriptions" className="btn btn-primary">Buy Me Coffee ☕</Link>
              <Link to="/blog" className="btn btn-secondary">Read Articles</Link>
            </div>
          </div>
        </section>

        <section className="blog-section">
          <div className="container">
            <h2 className="section-title">Latest Articles</h2>
            <div className="posts-grid">
              <article className="post-card">
                <div className="post-image">AI Revolution</div>
                <div className="post-content">
                  <div className="post-meta">
                    <span>Dec 15, 2024</span>
                    <span className="premium-badge">Premium</span>
                  </div>
                  <h3 className="post-title">The Future of AI in Enterprise Software</h3>
                  <p className="post-excerpt">Exploring how artificial intelligence is transforming enterprise software development and what it means for developers and businesses alike.</p>
                  <Link to="/blog" className="read-more">Read More →</Link>
                </div>
              </article>

              <article className="post-card">
                <div className="post-image">Cloud Computing</div>
                <div className="post-content">
                  <div className="post-meta">
                    <span>Dec 12, 2024</span>
                    <span>Free</span>
                  </div>
                  <h3 className="post-title">Serverless Architecture Best Practices</h3>
                  <p className="post-excerpt">A comprehensive guide to building scalable serverless applications with modern cloud platforms and microservices architecture.</p>
                  <Link to="/blog" className="read-more">Read More →</Link>
                </div>
              </article>

              <article className="post-card">
                <div className="post-image">Cybersecurity</div>
                <div className="post-content">
                  <div className="post-meta">
                    <span>Dec 10, 2024</span>
                    <span className="premium-badge">Premium</span>
                  </div>
                  <h3 className="post-title">Zero Trust Security Models</h3>
                  <p className="post-excerpt">Understanding the principles of zero trust security and how to implement it in your organization's infrastructure.</p>
                  <Link to="/blog" className="read-more">Read More →</Link>
                </div>
              </article>

              <article className="post-card">
                <div className="post-image">Web Development</div>
                <div className="post-content">
                  <div className="post-meta">
                    <span>Dec 8, 2024</span>
                    <span>Free</span>
                  </div>
                  <h3 className="post-title">Modern JavaScript Frameworks Comparison</h3>
                  <p className="post-excerpt">An in-depth comparison of React, Vue, and Angular in 2024, helping you choose the right framework for your next project.</p>
                  <Link to="/blog" className="read-more">Read More →</Link>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="newsletter-section">
          <div className="container">
            <h2 className="section-title">Stay Updated</h2>
            <p>Get the latest tech insights delivered to your inbox weekly</p>
            <form className="newsletter-form">
              <input type="email" className="newsletter-input" placeholder="Enter your email address" required />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
