import React, { useState } from 'react';
import './Contact.css';

interface ContactProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Contact: React.FC<ContactProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send to your backend
      console.log('Contact form submitted:', formData);
      
      setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`contact ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="contact-cards-container">
          <div className="contact-form-card">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Tell us more..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
          <div className="other-ways-card">
            <div className="other-ways-content">
              <div className="other-way-row">
                <span role="img" aria-label="email">📧</span>
                <a href="mailto:hello@coffeeblog.com">hello@coffeeblog.com</a>
              </div>
              <div className="other-way-row">
                <span role="img" aria-label="discord">💬</span>
                <a href="https://discord.gg/your-invite" target="_blank" rel="noopener noreferrer">Join our Discord</a>
              </div>
              <div className="other-way-row">
                <span role="img" aria-label="twitter">🐦</span>
                <a href="https://twitter.com/coffeeblog" target="_blank" rel="noopener noreferrer">@coffeeblog</a>
              </div>
              <div className="other-way-row">
                <span role="img" aria-label="github">🐙</span>
                <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
