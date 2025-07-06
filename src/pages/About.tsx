import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <div className="container">
        <section className="mission">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              Dot Product provides comprehensive technical analysis 
              that shapes modern web experiences. We believe that understanding how successful 
              design and engineering teams build scalable, maintainable systems helps the entire community grow.
            </p>
            <p>
              Our analysts are experienced designers and engineers who have worked on large-scale 
              design systems and frontend architectures. We focus on practical analysis that helps teams 
              make better technical and design decisions, from component API design to state management patterns.
            </p>
          </div>
        </section>

        <section className="team">
          <h2>Our Analysts</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👩‍💻</div>
              <h3>Sarah Chen</h3>
              <p className="role">Design Systems Analyst</p>
              <p>Former design systems lead with 8 years experience building scalable component libraries and design tokens.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍💻</div>
              <h3>David Kim</h3>
              <p className="role">Frontend Architecture Analyst</p>
              <p>Ex-engineering lead who has built micro-frontend architectures and performance optimization systems.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍🔬</div>
              <h3>Dr. Lisa Wang</h3>
              <p className="role">UI/UX Engineering Analyst</p>
              <p>Former principal engineer with expertise in accessibility, performance, and user experience engineering.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🚀</div>
              <h3>Michael Torres</h3>
              <p className="role">Infrastructure Analyst</p>
              <p>Former Netflix senior engineer who built content delivery systems serving 260+ million subscribers.</p>
            </div>
          </div>
        </section>

        <section className="coffee-connection">
          <h2>Why Coffee?</h2>
          <div className="coffee-content">
            <p>
              Every great engineering breakthrough happens over countless cups of coffee. Our 
              subscription model ensures our analysts can focus on deep research and quality 
              analysis instead of chasing ad revenue or sponsored content.
            </p>
            <p>
              When you subscribe to our coffee service, you're directly supporting independent 
              tech analysis. 60% of every subscription goes directly to our analysts, 25% covers 
              operational costs, and 15% ensures you get excellent coffee delivered to your door.
            </p>
            <div className="transparency-box">
              <h3>Full Transparency</h3>
              <ul>
                <li>60% - Direct analyst compensation</li>
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
