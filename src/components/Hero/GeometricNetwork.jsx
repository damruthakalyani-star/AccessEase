import React from 'react';
import './GeometricNetwork.css';

/**
 * GeometricNetwork Component
 * 
 * Polished, high-end light-theme interconnected geometric network representing
 * AI-assisted inclusion, connection, and accessible technology.
 * 
 * Features:
 * - High-visibility violet and pastel blue connecting lines.
 * - Glowing multi-layered central node with gentle breathing animation.
 * - Floating 3D polyhedral geometric crystals.
 * - 4 Translucent floating accessibility UI elements (Text-to-Speech, Speech-to-Text,
 *   Translation, Image Description).
 * - Multi-depth floating particles in violet, blue, and subtle pink.
 * - Hardware-accelerated CSS animations respecting prefers-reduced-motion.
 */
export default function GeometricNetwork() {
  return (
    <div className="geometric-network-wrapper" aria-hidden="true">
      {/* Soft Ambient Glow Orbs (Lavender, Pastel Blue & Subtle Pink) */}
      <div className="ambient-glow glow-lavender"></div>
      <div className="ambient-glow glow-blue"></div>
      <div className="ambient-glow glow-pink"></div>
      <div className="ambient-glow glow-violet"></div>

      <svg
        className="geometric-svg"
        viewBox="0 0 600 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Glowing Filters */}
          <filter id="glowViolet" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowCenter" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowBlue" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients for Lines, Trails and Facets */}
          <linearGradient id="lineGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#9333ea" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="lineGradSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="lineGradPink" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#f472b6" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
          </linearGradient>

          {/* 3D Polyhedral Facet Shading */}
          <linearGradient id="facetLavender" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ede9fe" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="facetPastelBlue" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f3e8ff" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="facetCore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ddd6fe" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.9" />
          </linearGradient>

          {/* Central Halo Radial Gradients */}
          <radialGradient id="centerHaloGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.25" />
            <stop offset="75%" stopColor="#38bdf8" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="nodeSparkGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#c4b5fd" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#7c3aed" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b1566" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ================================================================
            LIGHT TRAILS (Soft organic paths through the network)
            ================================================================ */}
        <g className="light-trails-group">
          <path
            className="light-trail trail-1"
            d="M50 290 C 130 190, 230 370, 350 250 C 430 170, 490 210, 560 160"
            stroke="url(#lineGradPrimary)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            className="light-trail trail-2"
            d="M90 430 C 190 350, 270 470, 420 380 C 480 340, 520 400, 565 350"
            stroke="url(#lineGradPink)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            className="light-trail trail-3"
            d="M130 95 C 230 165, 320 85, 430 175 C 480 215, 530 125, 575 95"
            stroke="url(#lineGradSecondary)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>

        {/* ================================================================
            INTERCONNECTED GEOMETRIC NETWORK LINES (Crisp & High Visibility)
            ================================================================ */}
        <g className="network-connections">
          {/* Main Primary Vectors connecting Hub to Surrounding Nodes */}
          <line x1="295" y1="260" x2="145" y2="155" stroke="url(#lineGradPrimary)" strokeWidth="1.6" strokeOpacity="0.75" />
          <line x1="295" y1="260" x2="445" y2="140" stroke="url(#lineGradSecondary)" strokeWidth="1.6" strokeOpacity="0.75" />
          <line x1="295" y1="260" x2="470" y2="345" stroke="url(#lineGradPrimary)" strokeWidth="1.6" strokeOpacity="0.75" />
          <line x1="295" y1="260" x2="340" y2="440" stroke="url(#lineGradPink)" strokeWidth="1.6" strokeOpacity="0.75" />
          <line x1="295" y1="260" x2="165" y2="405" stroke="url(#lineGradSecondary)" strokeWidth="1.6" strokeOpacity="0.75" />

          {/* Outer Perimeter Mesh Lines */}
          <line x1="145" y1="155" x2="285" y2="90" stroke="#8b5cf6" strokeWidth="1.4" strokeOpacity="0.65" />
          <line x1="285" y1="90" x2="445" y2="140" stroke="#38bdf8" strokeWidth="1.4" strokeOpacity="0.65" />
          <line x1="445" y1="140" x2="510" y2="235" stroke="#a855f7" strokeWidth="1.4" strokeOpacity="0.65" />
          <line x1="510" y1="235" x2="470" y2="345" stroke="#38bdf8" strokeWidth="1.4" strokeOpacity="0.65" />
          <line x1="470" y1="345" x2="340" y2="440" stroke="#a855f7" strokeWidth="1.4" strokeOpacity="0.65" />
          <line x1="340" y1="440" x2="225" y2="460" stroke="#38bdf8" strokeWidth="1.4" strokeOpacity="0.65" />
          <line x1="225" y1="460" x2="165" y2="405" stroke="#8b5cf6" strokeWidth="1.4" strokeOpacity="0.65" />
          <line x1="165" y1="405" x2="90" y2="285" stroke="#38bdf8" strokeWidth="1.4" strokeOpacity="0.65" />
          <line x1="90" y1="285" x2="145" y2="155" stroke="#8b5cf6" strokeWidth="1.4" strokeOpacity="0.65" />

          {/* Cross-Network Depth Connectors */}
          <line x1="145" y1="155" x2="225" y2="270" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.55" strokeDasharray="4 4" />
          <line x1="445" y1="140" x2="380" y2="230" stroke="#7dd3fc" strokeWidth="1" strokeOpacity="0.55" strokeDasharray="4 4" />
          <line x1="165" y1="405" x2="295" y2="355" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.55" strokeDasharray="4 4" />
          <line x1="285" y1="90" x2="295" y2="260" stroke="#f472b6" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="3 3" />

          {/* Glowing Travelling Light Pulses along Key Vectors */}
          <line
            className="pulse-path pulse-1"
            x1="145" y1="155" x2="295" y2="260"
            stroke="url(#lineGradPrimary)"
            strokeWidth="2.2"
            filter="url(#glowViolet)"
          />
          <line
            className="pulse-path pulse-2"
            x1="295" y1="260" x2="445" y2="140"
            stroke="url(#lineGradSecondary)"
            strokeWidth="2.2"
            filter="url(#glowBlue)"
          />
          <line
            className="pulse-path pulse-3"
            x1="295" y1="260" x2="470" y2="345"
            stroke="url(#lineGradPink)"
            strokeWidth="2.2"
            filter="url(#glowViolet)"
          />
          <line
            className="pulse-path pulse-4"
            x1="340" y1="440" x2="295" y2="260"
            stroke="url(#lineGradSecondary)"
            strokeWidth="2.2"
            filter="url(#glowBlue)"
          />
          <line
            className="pulse-path pulse-5"
            x1="165" y1="405" x2="295" y2="260"
            stroke="url(#lineGradPrimary)"
            strokeWidth="2.2"
            filter="url(#glowViolet)"
          />
        </g>

        {/* ================================================================
            FLOATING 3D POLYHEDRAL GEOMETRIC CRYSTALS
            ================================================================ */}
        {/* Top Floating Octahedron (3D Crystal) */}
        <g className="floating-shape shape-top" transform="translate(285, 90)">
          <polygon points="0,-26 20,-7 0,9" fill="url(#facetLavender)" stroke="#7c3aed" strokeWidth="1.3" />
          <polygon points="0,-26 -20,-7 0,9" fill="url(#facetPastelBlue)" stroke="#7c3aed" strokeWidth="1.3" />
          <polygon points="0,9 20,-7 0,24" fill="url(#facetPastelBlue)" stroke="#7c3aed" strokeWidth="1.3" />
          <polygon points="0,9 -20,-7 0,24" fill="url(#facetLavender)" stroke="#7c3aed" strokeWidth="1.3" />
          <circle cx="0" cy="0" r="3.5" fill="#7c3aed" filter="url(#glowViolet)" />
        </g>

        {/* Left Floating Tetrahedron */}
        <g className="floating-shape shape-left" transform="translate(90, 285)">
          <polygon points="0,-22 20,11 -20,11" fill="url(#facetLavender)" stroke="#9333ea" strokeWidth="1.3" />
          <polygon points="0,-22 0,7 20,11" fill="url(#facetPastelBlue)" stroke="#9333ea" strokeWidth="1.1" />
          <polygon points="0,-22 -20,11 0,7" fill="#fdf4ff" fillOpacity="0.8" stroke="#9333ea" strokeWidth="1.1" />
          <circle cx="0" cy="0" r="3" fill="#9333ea" />
        </g>

        {/* Right Floating Diamond Crystal */}
        <g className="floating-shape shape-right" transform="translate(510, 235)">
          <polygon points="0,-20 16,0 0,20 -16,0" fill="url(#facetPastelBlue)" stroke="#0284c7" strokeWidth="1.3" />
          <line x1="-16" y1="0" x2="16" y2="0" stroke="#0284c7" strokeWidth="0.9" />
          <line x1="0" y1="-20" x2="0" y2="20" stroke="#0284c7" strokeWidth="0.9" />
          <circle cx="0" cy="0" r="3" fill="#0284c7" filter="url(#glowBlue)" />
        </g>

        {/* Bottom Small Floating Crystal */}
        <g className="floating-shape shape-bottom" transform="translate(225, 460)">
          <polygon points="0,-16 14,0 0,16 -14,0" fill="url(#facetLavender)" stroke="#c084fc" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="2.5" fill="#c084fc" />
        </g>

        {/* ================================================================
            CENTRAL 3D ACCESSIBILITY AI CORE HUB (Enhanced Glow & Breathing)
            ================================================================ */}
        <g className="central-core-group" transform="translate(295, 260)">
          {/* Subtle Outer Glowing Halo Orb */}
          <circle cx="0" cy="0" r="75" fill="url(#centerHaloGlow)" className="core-halo-pulse" />
          
          {/* Concentric Orbital Rings */}
          <circle cx="0" cy="0" r="56" stroke="#c084fc" strokeWidth="1.2" strokeDasharray="5 7" opacity="0.75" className="spin-slow" />
          <circle cx="0" cy="0" r="46" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="4 5" opacity="0.8" className="spin-reverse" />
          
          {/* 3D Isometric Core Cube / Diamond */}
          {/* Top Facet */}
          <polygon points="0,-32 28,-16 0,0 -28,-16" fill="url(#facetCore)" stroke="#6d28d9" strokeWidth="1.6" />
          {/* Right Facet */}
          <polygon points="28,-16 28,16 0,32 0,0" fill="#ddd6fe" fillOpacity="0.9" stroke="#6d28d9" strokeWidth="1.6" />
          {/* Left Facet */}
          <polygon points="-28,-16 0,0 0,32 -28,16" fill="#bae6fd" fillOpacity="0.9" stroke="#6d28d9" strokeWidth="1.6" />

          {/* Central Glowing Spark Core */}
          <circle cx="0" cy="0" r="11" fill="url(#nodeSparkGlow)" filter="url(#glowCenter)" />
          <circle cx="0" cy="0" r="4" fill="#ffffff" />
        </g>

        {/* ================================================================
            ACCESSIBILITY NODES (Perception & Inclusion Vertices)
            ================================================================ */}
        {/* Node 1: Vision / Screen Narration (Top-Left) */}
        <g className="assist-node node-tts" transform="translate(145, 155)">
          <circle cx="0" cy="0" r="23" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.8" filter="url(#glowViolet)" />
          <circle cx="0" cy="0" r="18" fill="#f5f3ff" />
          {/* Speaker Icon */}
          <path d="M-6 -3 L-2 -3 L2 -6 L2 6 L-2 3 L-6 3 Z" fill="#6d28d9" />
          <path d="M5 -4 C 7 -2, 7 2, 5 4" stroke="#6d28d9" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Node 2: Hearing / Speech-to-Text (Top-Right) */}
        <g className="assist-node node-stt" transform="translate(445, 140)">
          <circle cx="0" cy="0" r="23" fill="#ffffff" stroke="#0284c7" strokeWidth="1.8" filter="url(#glowBlue)" />
          <circle cx="0" cy="0" r="18" fill="#f0f9ff" />
          {/* Microphone Icon */}
          <rect x="-3" y="-6" width="6" height="8" rx="3" fill="#0369a1" />
          <path d="M-5 -1 C -5 3, 5 3, 5 -1 M0 3 L0 6 M-3 6 L3 6" stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Node 3: AI Cognitive Simplifier (Middle-Right) */}
        <g className="assist-node node-simplify" transform="translate(470, 345)">
          <circle cx="0" cy="0" r="23" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.8" filter="url(#glowViolet)" />
          <circle cx="0" cy="0" r="18" fill="#faf5ff" />
          {/* Sparkle Icon */}
          <path d="M0 -7 L1.5 -2 L6 0 L1.5 2 L0 7 L-1.5 2 L-6 0 L-1.5 -2 Z" fill="#7c3aed" />
        </g>

        {/* Node 4: Regional Language Translator (Bottom-Center) */}
        <g className="assist-node node-translate" transform="translate(340, 440)">
          <circle cx="0" cy="0" r="23" fill="#ffffff" stroke="#0284c7" strokeWidth="1.8" filter="url(#glowBlue)" />
          <circle cx="0" cy="0" r="18" fill="#f0fdf4" />
          {/* Global Dialect Icon */}
          <circle cx="0" cy="0" r="7" stroke="#0284c7" strokeWidth="1.4" fill="none" />
          <ellipse cx="0" cy="0" rx="3.5" ry="7" stroke="#0284c7" strokeWidth="1.4" fill="none" />
          <line x1="-7" y1="0" x2="7" y2="0" stroke="#0284c7" strokeWidth="1.4" />
        </g>

        {/* Node 5: AI Image Alt-Text (Bottom-Left) */}
        <g className="assist-node node-image" transform="translate(165, 405)">
          <circle cx="0" cy="0" r="23" fill="#ffffff" stroke="#9333ea" strokeWidth="1.8" filter="url(#glowViolet)" />
          <circle cx="0" cy="0" r="18" fill="#fbf8ff" />
          {/* Image Frame Icon */}
          <rect x="-6" y="-5" width="12" height="10" rx="1.5" stroke="#7e22ce" strokeWidth="1.4" fill="none" />
          <circle cx="-2" cy="-2" r="1.5" fill="#7e22ce" />
          <path d="M-6 3 L-2 0 L3 4" stroke="#7e22ce" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        </g>

        {/* ================================================================
            SLOWLY FLOATING PARTICLES (Tiny Glowing Twinkling Dots)
            ================================================================ */}
        <g className="particles-group">
          <circle cx="185" cy="95" r="3.2" className="particle particle-1" fill="#c084fc" />
          <circle cx="370" cy="85" r="2.2" className="particle particle-2" fill="#38bdf8" />
          <circle cx="505" cy="105" r="2.8" className="particle particle-3" fill="#a855f7" />
          <circle cx="545" cy="280" r="3.2" className="particle particle-4" fill="#38bdf8" />
          <circle cx="420" cy="280" r="2.2" className="particle particle-5" fill="#f472b6" />
          <circle cx="400" cy="470" r="2.8" className="particle particle-1" fill="#818cf8" />
          <circle cx="270" cy="390" r="3.2" className="particle particle-2" fill="#a855f7" />
          <circle cx="115" cy="340" r="2.4" className="particle particle-3" fill="#38bdf8" />
          <circle cx="75" cy="210" r="2.8" className="particle particle-4" fill="#f472b6" />
          <circle cx="240" cy="190" r="2.2" className="particle particle-5" fill="#818cf8" />
          <circle cx="320" cy="160" r="2.5" className="particle particle-2" fill="#c084fc" />
          <circle cx="485" cy="420" r="2.4" className="particle particle-3" fill="#38bdf8" />
          <circle cx="130" cy="470" r="2.2" className="particle particle-1" fill="#f472b6" />
          <circle cx="210" cy="110" r="2.6" className="particle particle-4" fill="#38bdf8" />
        </g>
      </svg>

      {/* ================================================================
          4 TRANSLUCENT FLOATING ACCESSIBILITY UI ELEMENTS
          (Text-to-Speech, Speech-to-Text, Translation, Image Description)
          ================================================================ */}
      <div className="network-floating-cards" aria-hidden="true">
        {/* 1. Text-to-Speech Card (Top-Left) */}
        <div className="float-card card-tts">
          <div className="card-icon-bubble bubble-purple">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          </div>
          <div className="card-text-group">
            <span className="card-title">Text-to-Speech</span>
            <span className="card-status">Natural Audio</span>
          </div>
          <span className="card-badge audio-wave-badge">
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </span>
        </div>

        {/* 2. Speech-to-Text Card (Top-Right) */}
        <div className="float-card card-stt">
          <div className="card-icon-bubble bubble-blue">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            </svg>
          </div>
          <div className="card-text-group">
            <span className="card-title">Speech-to-Text</span>
            <span className="card-status">Live Captions</span>
          </div>
          <span className="card-badge live-dot-badge">
            <span className="live-dot"></span>
            <span>Real-time</span>
          </span>
        </div>

        {/* 3. Translation Card (Bottom-Right) */}
        <div className="float-card card-translate">
          <div className="card-icon-bubble bubble-pink">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div className="card-text-group">
            <span className="card-title">Translation</span>
            <span className="card-status">Regional AI</span>
          </div>
          <span className="card-badge dialect-badge">A ⇄ 文</span>
        </div>

        {/* 4. Image Description Card (Bottom-Left) */}
        <div className="float-card card-image">
          <div className="card-icon-bubble bubble-purple">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div className="card-text-group">
            <span className="card-title">Image Description</span>
            <span className="card-status">AI Alt-Text</span>
          </div>
          <span className="card-badge code-badge">alt=&ldquo;...&rdquo;</span>
        </div>
      </div>
    </div>
  );
}
