import React from 'react';
import './Features.css';

/**
 * FeatureCard Component
 * Reusable accessible card presenting an individual assistive tool.
 * Provides keyboard focus, ARIA role labeling, and feature highlight bullets.
 */
export default function FeatureCard({
  id,
  title,
  tag,
  description,
  highlights = [],
  icon,
  onExplore
}) {
  return (
    <article 
      className="feature-card" 
      tabIndex={0}
      aria-labelledby={`feature-${id}-title`}
    >
      <div className="card-header-row">
        <div className="feature-icon-wrapper" aria-hidden="true">
          {icon}
        </div>
        <span className="feature-tag">{tag}</span>
      </div>

      <h3 id={`feature-${id}-title`} className="feature-card-title">
        {title}
      </h3>

      <p className="feature-card-desc">
        {description}
      </p>

      {highlights.length > 0 && (
        <ul className="feature-highlights" aria-label={`Key features of ${title}`}>
          {highlights.map((item, index) => (
            <li key={index} className="feature-highlight-item">
              <span className="highlight-bullet" aria-hidden="true">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="card-footer">
        <button 
          type="button" 
          className="feature-action-btn"
          aria-label={`Explore and configure ${title} tool`}
          onClick={onExplore}
        >
          <span>Explore Tool</span>
          <svg 
            width="16" 
            height="16" 
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
        </button>
      </div>
    </article>
  );
}
