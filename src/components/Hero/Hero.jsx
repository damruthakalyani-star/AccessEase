import React, { useState, useCallback } from 'react';
import GeometricNetwork from './GeometricNetwork';
import './Hero.css';

/**
 * Hero Component
 * 
 * Polished, modern light-theme hero section.
 * Features:
 * - Headline: "Accessibility for everyone, everywhere."
 * - Balanced typography and responsive button group.
 * - Subtle pointer-based parallax on the decorative geometric visual.
 * - Ambient background lighting blending soft lavender, pastel blue, and subtle pink.
 * - Comprehensive accessibility and prefers-reduced-motion support.
 */
export default function Hero() {
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Subtle interactive parallax for decorative network visual
  const handleMouseMove = useCallback((e) => {
    // Respect reduced motion preferences
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setParallaxOffset({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setParallaxOffset({ x: 0, y: 0 });
  }, []);

  return (
    <section 
      id="hero" 
      className="hero-section" 
      aria-labelledby="hero-title"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative Ambient Lighting (Soft Lavender, Pastel Blue & Subtle Pink) */}
      <div className="hero-ambient-bg" aria-hidden="true">
        <div className="bg-gradient-orb bg-orb-lavender"></div>
        <div className="bg-gradient-orb bg-orb-blue"></div>
        <div className="bg-gradient-orb bg-orb-pink"></div>
        <div className="bg-mesh-grid"></div>
      </div>

      <div className="container hero-container">
        {/* Left Column: Hero Text Content & Actions */}
        <div className="hero-content">
          <div className="section-badge hero-badge">
            <span className="badge-icon" aria-hidden="true">✨</span>
            <span>AI-Powered Inclusion</span>
          </div>

          <h1 id="hero-title" className="hero-title">
            Accessibility for everyone, everywhere.
          </h1>

          <p className="hero-description">
            AccessEase is an AI-powered accessibility assistant that helps people
            overcome visual, hearing, reading and language barriers through simple,
            intelligent tools.
          </p>

          <div className="hero-actions">
            <a href="#features" className="btn btn-primary btn-lg hero-btn-primary">
              <span>Explore Tools</span>
              <svg 
                className="btn-arrow-icon" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            <a href="#about" className="btn btn-secondary btn-lg hero-btn-secondary">
              <span>Learn More</span>
            </a>
          </div>

          {/* Accessibility Highlights */}
          <div className="hero-highlights" aria-label="Platform Core Highlights">
            <div className="highlight-item">
              <span className="highlight-check" aria-hidden="true">✓</span>
              <span>100% Free &amp; Open Access</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-check" aria-hidden="true">✓</span>
              <span>WCAG 2.1 AA Aligned</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-check" aria-hidden="true">✓</span>
              <span>Zero Setup Required</span>
            </div>
          </div>
        </div>

        {/* Right Column: Upgraded Geometric Network with Parallax */}
        <div 
          className="hero-visual" 
          aria-hidden="true"
          style={{
            '--parallax-x': `${parallaxOffset.x.toFixed(2)}px`,
            '--parallax-y': `${parallaxOffset.y.toFixed(2)}px`
          }}
        >
          <GeometricNetwork />
        </div>
      </div>
    </section>
  );
}
