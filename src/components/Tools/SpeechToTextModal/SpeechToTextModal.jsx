import React, { useState, useEffect, useRef, useCallback } from 'react';
import './SpeechToTextModal.css';

/**
 * SpeechToTextModal Component
 * 
 * An accessible real-time Speech-to-Text workspace using the browser's
 * native Web Speech API (SpeechRecognition / webkitSpeechRecognition).
 * 
 * Features:
 * - Live speech-to-text voice transcription into an editable textarea.
 * - Start Listening and Stop Listening controls with prominent microphone button.
 * - Language selection: English (India), English (US), and Hindi.
 * - Copy Transcribed Text with temporary "Copied!" visual confirmation.
 * - Clear Text functionality.
 * - Clear microphone and recording status indicators with animated audio pulses.
 * - Graceful handling of microphone permission denial and browser incompatibility.
 * - Complete keyboard navigation, Escape key closing, and ARIA live announcements.
 */
export default function SpeechToTextModal({ isOpen, onClose }) {
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');
  const [statusMessage, setStatusMessage] = useState('Microphone ready. Click "Start Listening" to speak.');
  const [statusType, setStatusType] = useState('idle'); // 'idle' | 'listening' | 'error' | 'success'
  const [isCopied, setIsCopied] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const isManuallyStoppedRef = useRef(false);

  // Supported languages list
  const languageOptions = [
    { code: 'en-IN', label: 'English (India)' },
    { code: 'en-US', label: 'English (US)' },
    { code: 'hi-IN', label: 'Hindi (भारत)' }
  ];

  // Initialize SpeechRecognition instance
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setStatusType('error');
      setStatusMessage('Web Speech Recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage;

      recognition.onstart = () => {
        setIsListening(true);
        setStatusType('listening');
        setStatusMessage('Listening to your voice... Speak clearly into your microphone.');
      };

      recognition.onresult = (event) => {
        let currentInterim = '';
        let finalChunk = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalChunk += item[0].transcript + ' ';
          } else {
            currentInterim += item[0].transcript;
          }
        }

        if (finalChunk) {
          setTranscript((prev) => {
            const trimmed = finalChunk.trim();
            if (!prev) return trimmed;
            return prev + ' ' + trimmed;
          });
        }

        setInterimTranscript(currentInterim);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        setStatusType('error');

        switch (event.error) {
          case 'not-allowed':
          case 'service-not-allowed':
            setStatusMessage('Microphone access denied. Please click the lock icon in your browser address bar to allow microphone permissions.');
            break;
          case 'no-speech':
            setStatusMessage('No speech detected. Please check your microphone and speak again.');
            break;
          case 'audio-capture':
            setStatusMessage('No microphone was detected. Please ensure an input device is connected.');
            break;
          case 'network':
            setStatusMessage('Network error occurred during speech recognition. Please check your internet connection.');
            break;
          default:
            setStatusMessage(`Recognition issue: ${event.error}. Please try again.`);
            break;
        }
      };

      recognition.onend = () => {
        setInterimTranscript('');
        // If it ended naturally and wasn't manually stopped, update state to idle
        setIsListening(false);
        if (statusType !== 'error') {
          setStatusType('idle');
          setStatusMessage('Microphone stopped. Click "Start Listening" to resume.');
        }
      };

      recognitionRef.current = recognition;
    } catch (err) {
      setIsSupported(false);
      setStatusType('error');
      setStatusMessage('Failed to initialize speech recognition engine.');
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore cleanup abort errors
        }
      }
    };
  }, [selectedLanguage]);

  // Update language on active recognition
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    if (recognitionRef.current) {
      recognitionRef.current.lang = newLang;
    }
    if (isListening) {
      // Restart with new language
      handleStopListening();
      setTimeout(() => {
        handleStartListening();
      }, 200);
    }
  };

  // Start Listening handler
  const handleStartListening = () => {
    if (!recognitionRef.current || !isSupported) return;

    try {
      isManuallyStoppedRef.current = false;
      setStatusType('listening');
      setStatusMessage('Starting microphone...');
      recognitionRef.current.start();
    } catch (err) {
      // If already started, ignore or restart
      if (err.name !== 'InvalidStateError') {
        setStatusType('error');
        setStatusMessage('Could not activate microphone. Please try again.');
      }
    }
  };

  // Stop Listening handler
  const handleStopListening = useCallback(() => {
    isManuallyStoppedRef.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // ignore
      }
    }
    setIsListening(false);
    setInterimTranscript('');
    setStatusType('idle');
    setStatusMessage('Microphone stopped. Click "Start Listening" to continue.');
  }, []);

  // Copy Transcribed Text to Clipboard
  const handleCopyText = async () => {
    const textToCopy = (transcript + (interimTranscript ? ' ' + interimTranscript : '')).trim();
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setStatusMessage('Transcribed text copied to clipboard!');
      setTimeout(() => {
        setIsCopied(false);
        if (!isListening) {
          setStatusMessage('Microphone ready. Click "Start Listening" to speak.');
        }
      }, 2500);
    } catch (err) {
      setStatusMessage('Could not copy text automatically. Please select and copy manually.');
    }
  };

  // Clear Transcribed Text
  const handleClearText = () => {
    setTranscript('');
    setInterimTranscript('');
    setStatusMessage('Transcript cleared.');
    if (textareaRef.current) textareaRef.current.focus();
  };

  // Safe modal close handler
  const handleModalClose = useCallback(() => {
    handleStopListening();
    onClose();
  }, [handleStopListening, onClose]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      handleStopListening();
    };
  }, [isOpen, handleModalClose, handleStopListening]);

  // Backdrop click handler
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  if (!isOpen) return null;

  // Combined text representation for the textarea
  const fullDisplayedText = (
    transcript + (interimTranscript ? (transcript ? ' ' : '') + interimTranscript : '')
  );

  return (
    <div
      className="stt-modal-overlay"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        className="stt-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stt-modal-title"
        aria-describedby="stt-modal-desc"
        ref={modalRef}
      >
        {/* Modal Header */}
        <div className="stt-modal-header">
          <div className="stt-title-group">
            <div className="stt-header-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </div>
            <div>
              <h2 id="stt-modal-title" className="stt-modal-title">
                Speech-to-Text Assistant
              </h2>
              <p id="stt-modal-desc" className="stt-modal-subtitle">
                Converts live spoken voice into written text and real-time captions.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="stt-close-btn"
            aria-label="Close Speech-to-Text workspace"
            onClick={handleModalClose}
            ref={closeButtonRef}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Browser Incompatibility Banner */}
        {!isSupported && (
          <div className="stt-alert-banner banner-warning" role="alert">
            <span className="banner-icon" aria-hidden="true">⚠️</span>
            <div>
              <strong>Web Speech Recognition is not supported by your browser.</strong>
              <p>For live microphone dictation, please open AccessEase in Google Chrome, Microsoft Edge, or Safari.</p>
            </div>
          </div>
        )}

        {/* Dynamic Recording Status Indicator Bar */}
        <div className={`stt-status-bar status-${statusType}`} aria-live="polite">
          <div className="stt-status-indicator">
            <span
              className={`mic-pulse-indicator ${isListening ? 'active-recording' : 'idle-recording'}`}
              aria-hidden="true"
            ></span>
            <span className="stt-status-label">
              {isListening ? 'RECORDING ACTIVE' : statusType === 'error' ? 'ERROR' : 'READY'}
            </span>
          </div>

          <div className="stt-status-message-wrapper">
            {isListening && (
              <span className="stt-sound-bars" aria-hidden="true">
                <span className="sound-bar"></span>
                <span className="sound-bar"></span>
                <span className="sound-bar"></span>
                <span className="sound-bar"></span>
              </span>
            )}
            <span className="stt-status-message">{statusMessage}</span>
          </div>
        </div>

        {/* Language Selection Row */}
        <div className="stt-settings-row">
          <div className="stt-control-group">
            <label htmlFor="stt-language-select" className="stt-field-label">
              Select Spoken Language
            </label>
            <select
              id="stt-language-select"
              className="stt-select"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              disabled={!isSupported}
            >
              {languageOptions.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="stt-mic-prompt">
            <span className="prompt-badge">Privacy First</span>
            <span className="prompt-text">Audio is processed locally by your browser; no recordings are stored.</span>
          </div>
        </div>

        {/* Live Transcription Display Area */}
        <div className="stt-transcript-section">
          <div className="stt-label-row">
            <label htmlFor="stt-textarea" className="stt-field-label">
              Transcribed Text
            </label>
            <div className="stt-text-actions">
              <span className="char-count">
                {fullDisplayedText.length} characters
              </span>
              <button
                type="button"
                className="stt-text-btn"
                onClick={handleClearText}
                disabled={!fullDisplayedText}
                aria-label="Clear transcribed text"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="stt-textarea-wrapper">
            <textarea
              id="stt-textarea"
              ref={textareaRef}
              className={`stt-textarea ${isListening ? 'is-recording-focus' : ''}`}
              rows={6}
              placeholder="Your spoken words will appear here in real-time as you talk... You can also edit this text manually at any time."
              value={fullDisplayedText}
              onChange={(e) => {
                setTranscript(e.target.value);
                setInterimTranscript('');
              }}
            ></textarea>

            {/* Interim live words badge overlay */}
            {interimTranscript && (
              <div className="stt-interim-floating-pill" aria-hidden="true">
                <span className="interim-label">Hearing:</span>
                <span className="interim-text">&ldquo;{interimTranscript}&rdquo;</span>
              </div>
            )}
          </div>
        </div>

        {/* Primary Controls Bar */}
        <div className="stt-actions-bar">
          <div className="stt-primary-buttons">
            {!isListening ? (
              <button
                type="button"
                className="btn btn-primary stt-btn stt-btn-start"
                onClick={handleStartListening}
                disabled={!isSupported}
                aria-label="Start Listening to microphone"
              >
                <span className="btn-mic-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </span>
                <span>Start Listening</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary stt-btn stt-btn-stop"
                onClick={handleStopListening}
                aria-label="Stop Listening to microphone"
              >
                <span className="btn-stop-icon" aria-hidden="true">
                  <rect x="6" y="6" width="12" height="12" fill="currentColor" />
                </span>
                <span>Stop Listening</span>
              </button>
            )}

            <button
              type="button"
              className={`btn btn-secondary stt-btn stt-btn-copy ${isCopied ? 'copied-success' : ''}`}
              onClick={handleCopyText}
              disabled={!fullDisplayedText.trim()}
              aria-label="Copy transcribed text to clipboard"
            >
              {isCopied ? (
                <>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span style={{ color: '#047857' }}>Copied!</span>
                </>
              ) : (
                <>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            className="btn btn-secondary stt-btn-close-footer"
            onClick={handleModalClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
