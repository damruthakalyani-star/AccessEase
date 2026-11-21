import React, { useState, useEffect } from 'react';
import './Navbar.css';

/**
 * Navbar Component
 * Provides responsive, accessible navigation across the AccessEase web platform.
 * Supports keyboard escape handling, ARIA disclosure states, and mobile hamburger menu.
 */
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle mobile navigation menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close menu when a navigation item is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Close menu if user presses Escape key for keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Track scroll position to enhance navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          className="navbar-brand" 
          aria-label="AccessEase - Home"
          onClick={handleLinkClick}
        >
          <span className="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" fill="#2E1065" />
              {/* Universal accessibility figure */}
              <circle cx="16" cy="9" r="2.5" fill="#F3EFFC" />
              <path 
                d="M10 14.5C12 13.8 14 13.5 16 13.5C18 13.5 20 13.8 22 14.5M16 13.5V23M12.5 25.5L16 23L19.5 25.5" 
                stroke="#F3EFFC" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </span>
          <span className="brand-text">
            Access<span className="brand-highlight">Ease</span>
          </span>
        </a>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-nav-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={toggleMenu}
        >
          <span className={`hamburger-bar ${isMenuOpen ? 'active' : ''}`} aria-hidden="true"></span>
          <span className={`hamburger-bar ${isMenuOpen ? 'active' : ''}`} aria-hidden="true"></span>
          <span className={`hamburger-bar ${isMenuOpen ? 'active' : ''}`} aria-hidden="true"></span>
        </button>

        {/* Navigation Links */}
        <nav
          id="primary-navigation"
          className={`navbar-nav ${isMenuOpen ? 'open' : ''}`}
          aria-label="Main Navigation"
        >
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#hero" className="nav-link" onClick={handleLinkClick}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#features" className="nav-link" onClick={handleLinkClick}>
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link" onClick={handleLinkClick}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link" onClick={handleLinkClick}>
                Contact
              </a>
            </li>
          </ul>

          <div className="nav-cta-wrapper">
            <a href="#features" className="btn btn-primary nav-cta-btn" onClick={handleLinkClick}>
              Explore Tools
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
