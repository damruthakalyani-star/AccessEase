import React, { useState } from 'react';
import FeatureCard from './FeatureCard';
import TextToSpeechModal from '../Tools/TextToSpeechModal/TextToSpeechModal';
import './Features.css';

/**
 * Features Component
 * Displays the 5 core AI accessibility tools provided by AccessEase.
 */
export default function Features() {
  const [isTTSOpen, setIsTTSOpen] = useState(false);

  const handleExplore = (toolId) => {
    if (toolId === 'tts') {
      setIsTTSOpen(true);
    }
  };
  const tools = [
    {
      id: 'tts',
      title: 'Text to Speech',
      tag: 'Visual & Reading Aid',
      description:
        'Converts written articles, digital documents, and web content into natural, expressive voice narration. Perfect for low vision, visual impairments, dyslexia, or auditory learners.',
      highlights: [
        'Natural, human-like voice synthesis',
        'Customizable playback speed and pitch',
        'Synchronized karaoke-style word highlighting'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )
    },
    {
      id: 'stt',
      title: 'Speech to Text',
      tag: 'Auditory & Hearing Aid',
      description:
        'Transcribes live spoken discussions, classroom lectures, and audio recordings into instantaneous text captions, ensuring deaf and hard-of-hearing users never miss a word.',
      highlights: [
        'High-precision live speech transcription',
        'Smart noise suppression in busy rooms',
        'Speaker distinction and punctuation formatting'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      )
    },
    {
      id: 'simplifier',
      title: 'AI Text Simplifier',
      tag: 'Cognitive Inclusion',
      description:
        'Translates convoluted legal documents, technical jargon, and dense texts into clear, everyday language designed for neurodivergent individuals and non-native readers.',
      highlights: [
        'Customizable comprehension levels',
        'Instant bullet-point summaries',
        'Difficult word replacement with simple definitions'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      id: 'translator',
      title: 'Regional Language Translator',
      tag: 'Linguistic Inclusivity',
      description:
        'Overcomes language divides by translating vital digital services, health notices, and learning modules into regional languages and mother tongues with cultural nuances intact.',
      highlights: [
        'Accurate regional dialect translation',
        'Retains original emotional context',
        'Bidirectional voice and text translation'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      )
    },
    {
      id: 'image-desc',
      title: 'AI Image Description',
      tag: 'Visual Comprehension',
      description:
        'Inspects online graphics, charts, diagrams, and photos to generate rich, descriptive alternative text (alt-text) so screen reader users experience a complete visual picture.',
      highlights: [
        'Nuanced, context-sensitive alt-text',
        'Data chart and graph breakdown',
        'Screen-reader compatible export'
      ],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="features-section" aria-labelledby="features-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span aria-hidden="true">🛠️</span>
            <span>Inclusive Assistive Suite</span>
          </div>

          <h2 id="features-title" className="section-title">
            Designed for Every Ability
          </h2>

          <p className="section-subtitle">
            Explore our five core assistive AI tools built to empower independent
            reading, listening, cognitive comprehension, and multilingual communication.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="features-grid">
          {tools.map((tool) => (
            <FeatureCard
              key={tool.id}
              id={tool.id}
              title={tool.title}
              tag={tool.tag}
              description={tool.description}
              highlights={tool.highlights}
              icon={tool.icon}
              onExplore={() => handleExplore(tool.id)}
            />
          ))}
        </div>

        {/* Text to Speech Modal Tool */}
        <TextToSpeechModal
          isOpen={isTTSOpen}
          onClose={() => setIsTTSOpen(false)}
        />
      </div>
    </section>
  );
}
