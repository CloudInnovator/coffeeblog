import React, { useState } from 'react';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="contact">
      <div className="container">
        <header className="contact-header">
          <h1>Contact Dot Product</h1>
          <p>Get in touch with our editorial team or ask about supporting our writers</p>
        </header>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-section">
              <h3>📝 Editorial Team</h3>
              <p>Have a story tip or want to suggest a topic?</p>
              <p><strong>Email:</strong> editorial@dotproduct.tech</p>
            </div>
            
            <div className="info-section">
              <h3>☕ Support & Subscriptions</h3>
              <p>Questions about supporting our writers?</p>
              <p><strong>Email:</strong> support@dotproduct.tech</p>
            </div>
            
            <div className="info-section">
              <h3>🤝 Partnerships</h3>
              <p>Interested in collaborating?</p>
              <p><strong>Email:</strong> partnerships@dotproduct.tech</p>
            </div>

            <div className="info-section">
              <h3>👋 General Inquiries</h3>
              <p>For all other questions</p>
              <p><strong>Email:</strong> hello@dotproduct.tech</p>
              <p><strong>Phone:</strong> (555) 123-TECH</p>
            </div>

            <div className="info-section">
              <h3>🏢 Office</h3>
              <p>Dot Product HQ<br />
              123 Tech Street<br />
              San Francisco, CA 94105</p>
            </div>

            <div className="info-section">
              <h3>⚡ Response Times</h3>
              <ul>
                <li>Editorial inquiries: 24-48 hours</li>
                <li>Support questions: 4-8 hours</li>
                <li>General inquiries: 1-2 business days</li>
              </ul>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a topic</option>
                  <option value="editorial">Editorial / Story Tip</option>
                  <option value="support">Coffee Subscription Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback on Articles</option>
                  <option value="technical">Technical Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  required
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="success-message">
                  Thanks for your message! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>

        <section className="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How do I support your writers?</h3>
              <p>You can support our independent journalism by subscribing to our coffee service. 60% of every subscription goes directly to our writers.</p>
            </div>
            <div className="faq-item">
              <h3>Do you accept guest articles?</h3>
              <p>We occasionally accept guest articles from industry experts. Please email our editorial team with your proposal and writing samples.</p>
            </div>
            <div className="faq-item">
              <h3>Can I request coverage of specific topics?</h3>
              <p>Absolutely! We welcome suggestions for engineering topics, especially if you have insider knowledge or access to interesting systems.</p>
            </div>
            <div className="faq-item">
              <h3>How do you ensure technical accuracy?</h3>
              <p>Every article is reviewed by at least two engineers with relevant experience before publication. We also maintain relationships with experts at major tech companies.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
