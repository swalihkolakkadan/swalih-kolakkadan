/**
 * Chat-related TypeScript types
 */

export interface PhonemeAlignment {
  characters: string[];
  character_start_times_seconds: number[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioBase64?: string;
  alignment?: PhonemeAlignment;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  isPlaying: boolean;
  currentAudioData: {
    base64: string;
    alignment: PhonemeAlignment;
  } | null;
  currentTime: number;
  error: string | null;
}

