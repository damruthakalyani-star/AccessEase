import React, { useState } from 'react';
import './Contact.css';

/**
 * Contact Component
 * Accessible contact form and feedback channels for users and accessibility advocates.
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'feedback',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In this frontend structure stage, simulate a successful accessible submission
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span aria-hidden="true">💬</span>
            <span>Get In Touch</span>
          </div>

          <h2 id="contact-title" className="section-title">
            Connect With AccessEase
          </h2>

          <p className="section-subtitle">
            Have accessibility recommendations, feedback on our AI tools, or need an
            alternative format? We want to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info & Accessibility Commitment */}
          <div className="contact-info-card">
            <h3 className="info-card-title">Inclusive Support &amp; Feedback</h3>
            <p className="info-card-intro">
              We continually enhance our tools based on real feedback from people with
              disabilities, educators, and accessibility experts.
            </p>

            <div className="contact-details-list">
              <div className="detail-item">
                <div className="detail-icon" aria-hidden="true">✉️</div>
                <div>
                  <span className="detail-label">Accessibility Feedback Email</span>
                  <a href="mailto:support@accessease.org" className="detail-link">
                    support@accessease.org
                  </a>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon" aria-hidden="true">♿</div>
                <div>
                  <span className="detail-label">Alternate Format Requests</span>
                  <p className="detail-text">
                    Large print, digital Braille, and plain text transcripts available upon request.
                  </p>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon" aria-hidden="true">🌐</div>
                <div>
                  <span className="detail-label">Open Community</span>
                  <p className="detail-text">
                    Join our open inclusion forum to suggest and test upcoming AI features.
                  </p>
                </div>
              </div>
            </div>

            <div className="wcag-assurance-box">
              <span className="wcag-badge">WCAG 2.1 AA</span>
              <p className="wcag-text">
                Designed to comply with Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
              </p>
            </div>
          </div>

          {/* Right Column: Accessible Form */}
          <div className="contact-form-container">
            {isSubmitted ? (
              <div className="submission-success-banner" role="alert" tabIndex={0}>
                <div className="success-icon" aria-hidden="true">✓</div>
                <h3 className="success-title">Thank You for Your Feedback!</h3>
                <p className="success-message">
                  Your message has been received. Our team will review your comments and get back to you shortly.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', category: 'feedback', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="user-name" className="form-label">
                    Your Name <span className="required-star" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="user-name"
                    name="name"
                    type="text"
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="user-email" className="form-label">
                    Email Address <span className="required-star" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="user-email"
                    name="email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-category" className="form-label">
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-category"
                    name="category"
                    className="form-select"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="feedback">Accessibility Feedback</option>
                    <option value="feature">Tool Enhancement Request</option>
                    <option value="general">General Question</option>
                    <option value="partnership">Social Purpose Collaboration</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="user-message" className="form-label">
                    Message <span className="required-star" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="user-message"
                    name="message"
                    rows={4}
                    required
                    className="form-textarea"
                    placeholder="Describe how we can assist you or share your thoughts..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-submit">
                  <span>Submit Message</span>
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
