import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="container">
        <header className="about-header">
          <h1>About Dot Product</h1>
          <p>Independent tech journalism that cuts through the noise</p>
        </header>

        <section className="mission">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              Dot Product exists to provide in-depth, unbiased analysis of engineering advances at 
              the world's leading technology companies. We believe that understanding how systems 
              work at scale helps the entire tech community learn and grow.
            </p>
            <p>
              Our writers are experienced engineers and technical journalists who have worked at 
              FAANG companies and understand the challenges of building systems that serve billions 
              of users. We're committed to independent journalism, free from corporate influence.
            </p>
          </div>
        </section>

        <section className="team">
          <h2>Our Writers</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h3>Sarah Chen</h3>
              <p className="role">Senior AI/ML Writer</p>
              <p>Former Meta AI researcher with 8 years experience in large language models and distributed training systems.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>David Kim</h3>
              <p className="role">Hardware Systems Writer</p>
              <p>Ex-Google hardware engineer who worked on Pixel devices and cloud infrastructure optimization.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍🔬</div>
              <h3>Dr. Lisa Wang</h3>
              <p className="role">Computer Vision Writer</p>
              <p>Former Amazon scientist with PhD in Computer Vision, specialized in real-time image processing at scale.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🚀</div>
              <h3>Michael Torres</h3>
              <p className="role">Infrastructure Writer</p>
              <p>Former Netflix senior engineer who built content delivery systems serving 260+ million subscribers.</p>
            </div>
          </div>
        </section>

        <section className="coffee-connection">
          <h2>Why Coffee?</h2>
          <div className="coffee-content">
            <p>
              Every great engineering breakthrough happens over countless cups of coffee. Our 
              subscription model ensures our writers can focus on deep research and quality 
              writing instead of chasing ad revenue or sponsored content.
            </p>
            <p>
              When you subscribe to our coffee service, you're directly supporting independent 
              tech journalism. 60% of every subscription goes directly to our writers, 25% covers 
              operational costs, and 15% ensures you get excellent coffee delivered to your door.
            </p>
            <div className="transparency-box">
              <h3>Full Transparency</h3>
              <ul>
                <li>60% - Direct writer compensation</li>
                <li>25% - Platform operations & hosting</li>
                <li>15% - Premium coffee sourcing & shipping</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value">
              <div className="value-icon">🔍</div>
              <h3>Technical Accuracy</h3>
              <p>Every article is technically reviewed by experts in the field before publication.</p>
            </div>
            <div className="value">
              <div className="value-icon">🏗️</div>
              <h3>Engineering Focus</h3>
              <p>We focus on the engineering challenges and solutions, not just the business outcomes.</p>
            </div>
            <div className="value">
              <div className="value-icon">🎯</div>
              <h3>Independence</h3>
              <p>No corporate sponsors or advertising means our analysis is unbiased and honest.</p>
            </div>
            <div className="value">
              <div className="value-icon">📚</div>
              <h3>Education</h3>
              <p>We explain complex systems in a way that helps engineers at all levels learn.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
