import React from 'react';
import './About.css';

/**
 * About Component
 * Articulates the social purpose, mission, and foundational values of AccessEase.
 */
export default function About() {
  const pillars = [
    {
      icon: '🤝',
      title: 'Universal Inclusivity',
      description:
        'Digital access is a fundamental human right. We design solutions for diverse physical, sensory, cognitive, and linguistic backgrounds.'
    },
    {
      icon: '🛡️',
      title: 'Dignity & Autonomy',
      description:
        'Our tools provide independence, giving users the freedom to study, work, and connect online without depending on third-party intervention.'
    },
    {
      icon: '🌱',
      title: 'Ethical & Private AI',
      description:
        'We adhere to rigorous data privacy and anti-bias principles. User inputs remain confidential and are never sold or exploited.'
    }
  ];

  const stats = [
    { number: '1.3B+', label: 'People worldwide live with disabilities' },
    { number: '96.8%', label: 'Top million web pages with accessibility flaws' },
    { number: '5 Tools', label: 'Integrated assistive AI modalities in one place' },
    { number: '100%', label: 'Dedicated to free, open social impact' }
  ];

  return (
    <section id="about" className="about-section" aria-labelledby="about-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span aria-hidden="true">🌍</span>
            <span>Our Social Purpose</span>
          </div>

          <h2 id="about-title" className="section-title">
            Championing Digital Inclusion for All
          </h2>

          <p className="section-subtitle">
            We believe access to knowledge, connection, and opportunity must be universal.
            AccessEase was created to bridge the digital divide through compassionate technology.
          </p>
        </div>

        {/* Narrative Split: Mission & Vision */}
        <div className="about-narrative">
          <div className="narrative-card highlight-box">
            <h3 className="narrative-heading">The Challenge We Address</h3>
            <p className="narrative-text">
              The internet is the central gateway to education, employment, healthcare,
              and community. Yet over 96% of the web fails basic accessibility evaluations.
              For people living with visual impairments, hearing loss, cognitive differences,
              or language barriers, everyday online tasks can become exhausting obstacles.
            </p>
            <p className="narrative-text">
              Traditional assistive software is often fragmented, expensive, and difficult
              to configure. This leaves millions of talented individuals excluded from equal digital participation.
            </p>
          </div>

          <div className="narrative-card mission-box">
            <h3 className="narrative-heading">The AccessEase Solution</h3>
            <p className="narrative-text">
              AccessEase unites cutting-edge artificial intelligence with universal design
              principles. Whether it is reading text aloud, simplifying dense technical terms,
              generating image descriptions, or translating regional dialects, we transform
              complex content into comfortable, accessible formats.
            </p>
            <p className="narrative-text">
              Our vision is simple: an inclusive internet where technology seamlessly adapts
              to the human, never forcing the human to struggle against technology.
            </p>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="about-stats" aria-label="Accessibility by the Numbers">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Core Pillars */}
        <div className="about-pillars">
          <h3 className="pillars-main-title">Core Principles That Guide Us</h3>
          <div className="pillars-grid">
            {pillars.map((pillar, index) => (
              <div key={index} className="pillar-card">
                <div className="pillar-icon" aria-hidden="true">
                  {pillar.icon}
                </div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
