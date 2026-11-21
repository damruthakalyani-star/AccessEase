import React, { useState, useEffect, useRef, useCallback } from 'react';
import './TextToSpeechModal.css';

/**
 * TextToSpeechModal Component
 * 
 * An accessible modal tool providing text-to-speech functionality
 * using the browser's native Web Speech API (SpeechSynthesis).
 * 
 * Features:
 * - Real-time speech synthesis with browser-available voice selection.
 * - Listen, Pause, Resume, and Stop controls.
 * - Playback rate (speed) selector for cognitive and auditory accessibility.
 * - Accessible dialog markup (role="dialog", aria-modal="true", aria-live).
 * - Keyboard navigation (Escape key to close, auto-focus, focus restoration).
 * - Screen reader announcements and body scroll lock.
 */
export default function TextToSpeechModal({ isOpen, onClose }) {
  const [text, setText] = useState(
    'Welcome to AccessEase! This tool converts any digital text into natural, clear speech. You can customize the voice, adjust playback speed, and control audio at your own pace.'
  );
  const [voices, setVoices] = useState([]);
  const [selectedVoiceUri, setSelectedVoiceUri] = useState('');
  const [rate, setRate] = useState(1);
  const [playbackState, setPlaybackState] = useState('idle'); // 'idle' | 'playing' | 'paused'
  const [isSupported, setIsSupported] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Ready to read aloud.');

  const modalRef = useRef(null);
  const textareaRef = useRef(null);
  const closeButtonRef = useRef(null);
  const activeUtteranceRef = useRef(null);

  // Check browser Web Speech API compatibility & populate voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      setStatusMessage('Web Speech API is not supported in this browser.');
      return;
    }

    const updateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      if (availableVoices.length > 0 && !selectedVoiceUri) {
        // Prefer default voice or an English voice if available
        const defaultVoice =
          availableVoices.find((v) => v.default) ||
          availableVoices.find((v) => v.lang.startsWith('en')) ||
          availableVoices[0];
        if (defaultVoice) {
          setSelectedVoiceUri(defaultVoice.voiceURI || defaultVoice.name);
        }
      }
    };

    updateVoices();

    // Chrome/Chromium loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedVoiceUri]);

  // Handle Stop / Cancel Speech safely
  const handleStop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlaybackState('idle');
    setStatusMessage('Speech stopped.');
  }, []);

  // Keyboard navigation & Focus management
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus the textarea after opening
    const focusTimeout = setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleStop();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimeout);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      handleStop();
    };
  }, [isOpen, onClose, handleStop]);

  // Play / Listen handler
  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    if (!text.trim()) {
      setStatusMessage('Please enter text before playing.');
      if (textareaRef.current) textareaRef.current.focus();
      return;
    }

    // Cancel any existing speech before starting
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    activeUtteranceRef.current = utterance;

    // Apply voice
    if (selectedVoiceUri && voices.length > 0) {
      const voiceObj = voices.find(
        (v) => (v.voiceURI || v.name) === selectedVoiceUri
      );
      if (voiceObj) {
        utterance.voice = voiceObj;
      }
    }

    utterance.rate = Number(rate) || 1;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setPlaybackState('playing');
      setStatusMessage('Speaking now...');
    };

    utterance.onpause = () => {
      setPlaybackState('paused');
      setStatusMessage('Speech paused.');
    };

    utterance.onresume = () => {
      setPlaybackState('playing');
      setStatusMessage('Speech resumed.');
    };

    utterance.onend = () => {
      setPlaybackState('idle');
      setStatusMessage('Speech completed.');
    };

    utterance.onerror = (e) => {
      // Don't treat manual cancellation as an unhandled error
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        setStatusMessage(`Speech error: ${e.error}`);
      }
      setPlaybackState('idle');
    };

    window.speechSynthesis.speak(utterance);
  };

  // Pause handler
  const handlePause = () => {
    if (!('speechSynthesis' in window)) return;
    if (playbackState === 'playing') {
      window.speechSynthesis.pause();
      setPlaybackState('paused');
      setStatusMessage('Speech paused.');
    }
  };

  // Resume handler
  const handleResume = () => {
    if (!('speechSynthesis' in window)) return;
    if (playbackState === 'paused') {
      window.speechSynthesis.resume();
      setPlaybackState('playing');
      setStatusMessage('Speech resumed.');
    }
  };

  // Close helper
  const handleModalClose = () => {
    handleStop();
    onClose();
  };

  // Handle clicking on the backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="tts-modal-overlay"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="tts-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tts-modal-title"
        aria-describedby="tts-modal-desc"
        ref={modalRef}
      >
        {/* Modal Header */}
        <div className="tts-modal-header">
          <div className="tts-title-group">
            <div className="tts-header-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            </div>
            <div>
              <h2 id="tts-modal-title" className="tts-modal-title">
                Text-to-Speech Assistant
              </h2>
              <p id="tts-modal-desc" className="tts-modal-subtitle">
                Converts written content into natural spoken audio in real time.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="tts-close-btn"
            aria-label="Close Text-to-Speech tool"
            onClick={handleModalClose}
            ref={closeButtonRef}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Browser Support Warning if needed */}
        {!isSupported && (
          <div className="tts-unsupported-banner" role="alert">
            <span>⚠️ Your browser does not support the Web Speech API. Please try Google Chrome, Microsoft Edge, or Safari.</span>
          </div>
        )}

        {/* Status Indicator Bar */}
        <div className="tts-status-bar" aria-live="polite">
          <div className="status-indicator-badge">
            <span
              className={`status-pulse-dot ${
                playbackState === 'playing' ? 'speaking' : playbackState === 'paused' ? 'paused' : 'idle'
              }`}
            ></span>
            <span className="status-state-text">
              {playbackState === 'playing'
                ? 'Speaking'
                : playbackState === 'paused'
                ? 'Paused'
                : 'Ready'}
            </span>
          </div>
          <span className="status-message-text">{statusMessage}</span>
        </div>

        {/* Text Input Area */}
        <div className="tts-input-section">
          <div className="tts-label-row">
            <label htmlFor="tts-textarea" className="tts-field-label">
              Enter or Paste Text <span className="required-star" aria-hidden="true">*</span>
            </label>
            <div className="tts-text-actions">
              <span className="char-count">{text.length} characters</span>
              <button
                type="button"
                className="clear-text-btn"
                onClick={() => {
                  setText('');
                  if (textareaRef.current) textareaRef.current.focus();
                }}
                disabled={!text.length}
              >
                Clear
              </button>
            </div>
          </div>

          <textarea
            id="tts-textarea"
            ref={textareaRef}
            className="tts-textarea"
            rows={5}
            placeholder="Type or paste any text here that you want to hear read aloud..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        {/* Voice and Speed Controls */}
        <div className="tts-controls-row">
          {/* Voice Dropdown */}
          <div className="tts-control-group voice-group">
            <label htmlFor="tts-voice-select" className="tts-field-label">
              Voice Selection
            </label>
            <select
              id="tts-voice-select"
              className="tts-select"
              value={selectedVoiceUri}
              onChange={(e) => setSelectedVoiceUri(e.target.value)}
              disabled={voices.length === 0}
            >
              {voices.length === 0 ? (
                <option value="">Default System Voice</option>
              ) : (
                voices.map((voice) => (
                  <option
                    key={voice.voiceURI || voice.name}
                    value={voice.voiceURI || voice.name}
                  >
                    {voice.name} ({voice.lang}) {voice.default ? '— Default' : ''}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Speed / Rate Selection */}
          <div className="tts-control-group speed-group">
            <label htmlFor="tts-rate-select" className="tts-field-label">
              Reading Speed
            </label>
            <div className="speed-selector-pills" role="radiogroup" aria-label="Reading speed">
              {[
                { label: '0.8×', value: 0.8 },
                { label: '1.0× (Normal)', value: 1.0 },
                { label: '1.25×', value: 1.25 },
                { label: '1.5×', value: 1.5 }
              ].map((item) => (
                <button
                  key={item.value}
                  type="button"
                  role="radio"
                  aria-checked={rate === item.value}
                  className={`speed-pill ${rate === item.value ? 'active' : ''}`}
                  onClick={() => setRate(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="tts-actions-bar">
          <div className="tts-playback-buttons">
            {playbackState === 'idle' && (
              <button
                type="button"
                className="btn btn-primary tts-btn tts-btn-listen"
                onClick={handleSpeak}
                disabled={!isSupported || !text.trim()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Listen</span>
              </button>
            )}

            {playbackState === 'playing' && (
              <button
                type="button"
                className="btn btn-secondary tts-btn tts-btn-pause"
                onClick={handlePause}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                <span>Pause</span>
              </button>
            )}

            {playbackState === 'paused' && (
              <button
                type="button"
                className="btn btn-primary tts-btn tts-btn-resume"
                onClick={handleResume}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Resume</span>
              </button>
            )}

            <button
              type="button"
              className="btn btn-secondary tts-btn tts-btn-stop"
              onClick={handleStop}
              disabled={playbackState === 'idle'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="6" y="6" width="12" height="12" />
              </svg>
              <span>Stop</span>
            </button>
          </div>

          <button
            type="button"
            className="btn btn-secondary tts-btn-close-footer"
            onClick={handleModalClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
