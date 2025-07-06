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
        <div className="contact-content">
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
                  <option value="content">Design/Engineering Analysis Suggestion</option>
                  <option value="support">Coffee Subscription Support</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback on Analysis</option>
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
              <h3>How do I support your analysts?</h3>
              <p>You can support our independent design and engineering analysis by subscribing to our coffee service. 60% of every subscription goes directly to our content creators.</p>
            </div>
            <div className="faq-item">
              <h3>Do you accept guest articles?</h3>
              <p>We occasionally accept guest articles from design and engineering experts. Please email our content team with your proposal and writing samples.</p>
            </div>
            <div className="faq-item">
              <h3>Can I request coverage of specific topics?</h3>
              <p>Absolutely! We welcome suggestions for design patterns, engineering architecture, and UI/UX analysis topics.</p>
            </div>
            <div className="faq-item">
              <h3>How do you ensure technical accuracy?</h3>
              <p>Every analysis is reviewed by experienced designers and engineers before publication. We focus on evidence-based analysis and real-world design patterns.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
