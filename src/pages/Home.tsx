import React from 'react';
import { Link } from 'react-router-dom';
import SaveArticleButton from '../components/SaveArticleButton';
import LikeButton from '../components/LikeButton';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <main className="main-content">
        <section className="blog-section">
          <div className="container">
            <div className="posts-grid">
              <article className="post-card">
                <div className="post-image">Design Systems</div>
                <div className="post-content">
                  <h3 className="post-title">Design System Architecture at Scale</h3>
                  <p className="post-excerpt">Analysis of how modern design systems are architected to maintain consistency while enabling innovation across large organizations.</p>
                  <div className="post-meta">
                    <span>Dec 15, 2024</span>
                    <span>8 min read</span>
                  </div>
                  <Link to="/blog" className="read-more">Read More →</Link>
                  <div className="post-header">
                    <div className="post-actions">
                      <LikeButton
                        articleId="1"
                        title="Design System Architecture at Scale"
                      />
                      <SaveArticleButton
                        articleId="1"
                        title="Design System Architecture at Scale"
                        excerpt="Analysis of how modern design systems are architected to maintain consistency while enabling innovation across large organizations."
                        category="Design Systems"
                        url="/blog/1"
                      />
                      <button className="reads-btn" disabled>
                        👁️ 2.3k
                      </button>
                      <button className="comments-btn" disabled>
                        💬 42
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              <article className="post-card">
                <div className="post-image">Component Engineering</div>
                <div className="post-content">
                  <h3 className="post-title">Component API Design Patterns</h3>
                  <p className="post-excerpt">How component library APIs are designed to balance flexibility with ease of use in modern frontend frameworks.</p>
                  <div className="post-meta">
                    <span>Dec 12, 2024</span>
                    <span>6 min read</span>
                  </div>
                  <Link to="/blog" className="read-more">Read More →</Link>
                  <div className="post-header">
                    <div className="post-actions">
                      <LikeButton
                        articleId="2"
                        title="Component API Design Patterns"
                      />
                      <SaveArticleButton
                        articleId="2"
                        title="Component API Design Patterns"
                        excerpt="How component library APIs are designed to balance flexibility with ease of use in modern frontend frameworks."
                        category="Engineering"
                        url="/blog/2"
                      />
                      <button className="reads-btn" disabled>
                        👁️ 1.8k
                      </button>
                      <button className="comments-btn" disabled>
                        💬 28
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              <article className="post-card">
                <div className="post-image">Frontend Architecture</div>
                <div className="post-content">
                  <h3 className="post-title">Micro-Frontend Architecture Analysis</h3>
                  <p className="post-excerpt">Technical analysis of micro-frontend patterns and their impact on large-scale application architecture.</p>
                  <div className="post-meta">
                    <span>Dec 10, 2024</span>
                    <span>10 min read</span>
                  </div>
                  <Link to="/blog" className="read-more">Read More →</Link>
                  <div className="post-header">
                    <div className="post-actions">
                      <LikeButton
                        articleId="3"
                        title="Micro-Frontend Architecture Analysis"
                      />
                      <SaveArticleButton
                        articleId="3"
                        title="Micro-Frontend Architecture Analysis"
                        excerpt="Technical analysis of micro-frontend patterns and their impact on large-scale application architecture."
                        category="Architecture"
                        url="/blog/3"
                      />
                      <button className="reads-btn" disabled>
                        👁️ 3.1k
                      </button>
                      <button className="comments-btn" disabled>
                        💬 67
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              <article className="post-card">
                <div className="post-image">Web Development</div>
                <div className="post-content">
                  <h3 className="post-title">Modern JavaScript Frameworks Comparison</h3>
                  <p className="post-excerpt">An in-depth comparison of React, Vue, and Angular in 2024, helping you choose the right framework for your next project.</p>
                  <div className="post-meta">
                    <span>Dec 8, 2024</span>
                    <span>12 min read</span>
                  </div>
                  <Link to="/blog" className="read-more">Read More →</Link>
                  <div className="post-header">
                    <div className="post-actions">
                      <button className="like-btn">
                        ❤️ Like
                      </button>
                      <SaveArticleButton
                        articleId="4"
                        title="Modern JavaScript Frameworks Comparison"
                        excerpt="An in-depth comparison of React, Vue, and Angular in 2024, helping you choose the right framework for your next project."
                        category="Frontend"
                        url="/blog/4"
                      />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
