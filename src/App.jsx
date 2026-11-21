import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

/**
 * AccessEase - Main Application Component
 * Assembles the initial frontend layout using semantic, accessible HTML landmarks.
 */
export default function App() {
  return (
    <div className="app-wrapper">
      {/* Keyboard Accessibility: Quick Skip Link for Screen Reader and Keyboard Users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content">
        <Hero />
        <Features />
        <About />
        <Contact />
      </main>

      {/* Footer Landmark */}
      <Footer />
    </div>
  );
}
