import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Browser Speech Recognition type declarations.
 * The Web Speech API is not yet in the standard TypeScript lib,
 * so we declare the minimal interface we need.
 */
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  onaudiostart: (() => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

/**
 * Get the SpeechRecognition constructor if available in the current browser.
 */
function getSpeechRecognition(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;

  const SR =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  return SR ?? null;
}

export interface UseSpeechToTextReturn {
  /** Whether the Web Speech API is available in this browser */
  isSupported: boolean;
  /** Whether the mic is currently active and listening */
  isListening: boolean;
  /** Live interim transcript (updates as the user speaks) */
  transcript: string;
  /** The last committed final transcript */
  finalTranscript: string;
  /** Error message, if any (mic denied, no-speech, network, etc.) */
  error: string | null;
  /** Start listening for speech */
  startListening: () => void;
  /** Stop listening and commit current transcript */
  stopListening: () => void;
  /** Reset all transcript state */
  resetTranscript: () => void;
}

const ERROR_MESSAGES: Record<string, string> = {
  'not-allowed': 'Microphone access denied. Please allow mic access in your browser settings.',
  'no-speech': 'No speech detected. Please try again.',
  'network': 'Network error. Speech recognition requires an internet connection.',
  'audio-capture': 'No microphone found. Please connect a microphone.',
  'aborted': '', // intentional abort, no error to show
};

export function useSpeechToText(): UseSpeechToTextReturn {
  const isSupported = getSpeechRecognition() !== null;

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const isListeningRef = useRef(false);

  /**
   * Start listening. Creates a fresh SpeechRecognition instance each time
   * to avoid stale state issues across browsers.
   */
  const startListening = useCallback(() => {
    const SR = getSpeechRecognition();
    if (!SR) return;

    // Stop any previous instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }

    setError(null);
    setTranscript('');
    setFinalTranscript('');

    const recognition = new SR();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      isListeningRef.current = true;
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = result[0].transcript;

        if (result.isFinal) {
          final += text;
        } else {
          interim += text;
        }
      }

      if (final) {
        setFinalTranscript(prev => (prev + ' ' + final).trim());
        setTranscript('');
      } else {
        setTranscript(interim);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const message = ERROR_MESSAGES[event.error] ?? `Speech recognition error: ${event.error}`;
      // Don't show error for intentional aborts
      if (event.error !== 'aborted') {
        setError(message);
      }
      // 'not-allowed' and 'audio-capture' are fatal — stop listening
      if (event.error === 'not-allowed' || event.error === 'audio-capture') {
        isListeningRef.current = false;
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      // The browser may auto-stop (e.g., after silence). If we still intend
      // to be listening (user hasn't pressed stop), restart.
      // But don't restart if there was a fatal error.
      if (isListeningRef.current) {
        // User is still expecting to be listened to — stop gracefully
        // instead of auto-restarting endlessly.
        isListeningRef.current = false;
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      setError('Failed to start speech recognition.');
      setIsListening(false);
      isListeningRef.current = false;
    }
  }, []);

  /**
   * Stop listening and commit whatever transcript we have.
   */
  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    setIsListening(false);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
  }, []);

  /**
   * Reset all transcript state.
   */
  const resetTranscript = useCallback(() => {
    setTranscript('');
    setFinalTranscript('');
    setError(null);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    finalTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
}
