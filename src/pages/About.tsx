import React from 'react';
import './About.css';

interface AboutProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const About: React.FC<AboutProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className={`about ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="about-header">
          <h1>About Coffee Blog</h1>
          <p>
            A passionate community exploring the intersection of technology, design, and great content.
          </p>
        </div>

        <div className="mission">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              We believe in creating thoughtful, in-depth content that helps developers, designers, and 
              technology enthusiasts stay informed about the latest trends and best practices in their fields.
            </p>
            <p>
              Our platform combines the love of great coffee with the passion for great code, creating 
              a space where community members can both learn and contribute to the ongoing conversation 
              about modern web development and design.
            </p>
          </div>
        </div>

        <div className="team">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>Tech Lead</h3>
              <p className="role">Full Stack Developer</p>
              <p>
                Passionate about creating scalable web applications and sharing knowledge 
                about modern development practices.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">🎨</div>
              <h3>Design Lead</h3>
              <p className="role">UI/UX Designer</p>
              <p>
                Focused on creating intuitive and beautiful user experiences that make 
                complex topics accessible to everyone.
              </p>
            </div>
            <div className="team-member">
              <div className="member-avatar">📝</div>
              <h3>Content Creator</h3>
              <p className="role">Technical Writer</p>
              <p>
                Dedicated to crafting clear, comprehensive content that helps developers 
                grow their skills and stay up-to-date.
              </p>
            </div>
          </div>
        </div>

        <div className="coffee-connection">
          <h2>Why Coffee?</h2>
          <div className="coffee-content">
            <p>
              Coffee is more than just a drink – it's the fuel that powers late-night coding sessions, 
              the companion to morning design reviews, and the catalyst for great conversations.
            </p>
            <p>
              Just like great code, great coffee requires attention to detail, patience, and passion. 
              We believe both deserve to be celebrated.
            </p>
            <div className="transparency-box">
              <h3>Support Transparency</h3>
              <ul>
                <li>💰 All donations go toward content creation</li>
                <li>☕ Coffee purchases support our writing team</li>
                <li>📚 Subscriptions help us maintain the platform</li>
                <li>🎯 100% focused on quality content</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value">
              <div className="value-icon">🎯</div>
              <h3>Quality First</h3>
              <p>
                We prioritize depth over breadth, ensuring every piece of content provides 
                real value to our community.
              </p>
            </div>
            <div className="value">
              <div className="value-icon">🌟</div>
              <h3>Community Driven</h3>
              <p>
                Our content is shaped by the needs and interests of our community members 
                and contributors.
              </p>
            </div>
            <div className="value">
              <div className="value-icon">🔬</div>
              <h3>Practical Focus</h3>
              <p>
                We emphasize practical, actionable insights that you can apply immediately 
                in your projects.
              </p>
            </div>
            <div className="value">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>
                We stay at the forefront of technology trends while maintaining a critical 
                perspective on new tools and practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
