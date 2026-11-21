import React from 'react';
import './Footer.css';

/**
 * Footer Component
 * Clean, accessible footer with navigation links, accessibility declaration, and copyright.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand & Purpose Column */}
          <div className="footer-brand-column">
            <a href="#hero" className="footer-brand" aria-label="AccessEase - Return to Top">
              <span className="footer-brand-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="15" fill="#f5f3ff" />
                  <circle cx="16" cy="9" r="2.5" fill="#2E1065" />
                  <path 
                    d="M10 14.5C12 13.8 14 13.5 16 13.5C18 13.5 20 13.8 22 14.5M16 13.5V23M12.5 25.5L16 23L19.5 25.5" 
                    stroke="#2E1065" 
                    strokeWidth="2.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />
                </svg>
              </span>
              <span className="footer-brand-text">
                Access<span className="footer-brand-highlight">Ease</span>
              </span>
            </a>

            <p className="footer-mission-text">
              An AI-powered accessibility assistant dedicated to breaking down digital barriers.
              Empowering independence, comprehension, and equal participation across the modern web.
            </p>

            <div className="footer-compliance-pill">
              <span className="compliance-icon" aria-hidden="true">♿</span>
              <span>Committed to WCAG 2.1 AA Standards</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-links-column">
            <h4 className="footer-column-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li><a href="#hero" className="footer-link">Home</a></li>
              <li><a href="#features" className="footer-link">Features</a></li>
              <li><a href="#about" className="footer-link">Our Social Mission</a></li>
              <li><a href="#contact" className="footer-link">Contact &amp; Feedback</a></li>
            </ul>
          </div>

          {/* Assistive Tools Column */}
          <div className="footer-links-column">
            <h4 className="footer-column-heading">Assistive Tools</h4>
            <ul className="footer-links-list">
              <li><a href="#features" className="footer-link">Text to Speech</a></li>
              <li><a href="#features" className="footer-link">Speech to Text</a></li>
              <li><a href="#features" className="footer-link">AI Text Simplifier</a></li>
              <li><a href="#features" className="footer-link">Regional Language Translator</a></li>
              <li><a href="#features" className="footer-link">AI Image Description</a></li>
            </ul>
          </div>

          {/* Accessibility & Values */}
          <div className="footer-links-column">
            <h4 className="footer-column-heading">Accessibility Values</h4>
            <ul className="footer-links-list">
              <li><a href="#about" className="footer-link">Universal Design</a></li>
              <li><a href="#about" className="footer-link">Cognitive Inclusion</a></li>
              <li><a href="#about" className="footer-link">Data Privacy Promise</a></li>
              <li><a href="#contact" className="footer-link">Request Accommodations</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; {currentYear} AccessEase – AI-Powered Accessibility Assistant. All rights reserved.
          </p>
          <p className="built-with-text">
            Built with empathy for a more accessible digital world.
          </p>
        </div>
      </div>
    </footer>
  );
}
