/**
 * Chat-related TypeScript types
 * Updated for Amazon Polly viseme-based lip-sync
 */

/** A single viseme mark for lip-sync animation */
export interface VisemeMark {
  time: number;   // Time in seconds from audio start
  viseme: string; // Viseme ID (p, t, k, f, S, T, etc.)
}

/** A single word mark with timing */
export interface WordMark {
  time: number;  // Time in seconds from audio start
  value: string; // The word
}

/** Speech alignment data for lip-sync animation using Amazon Polly */
export interface SpeechAlignment {
  visemes: VisemeMark[]; // Viseme timing for mouth shapes
  words: WordMark[];     // Word timing for text highlighting
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioBase64?: string;
  alignment?: SpeechAlignment;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isPlaying: boolean;
  currentAudioData: {
    base64: string;
    alignment: SpeechAlignment;
  } | null;
  currentTime: number;
  error: string | null;
}
