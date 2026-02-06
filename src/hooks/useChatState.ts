import { useState, useCallback } from 'react';
import type { ChatMessage, PhonemeAlignment } from '../types/chatTypes';
import { sendMessage as sendChatMessage } from '../services/chatService';

interface UseChatStateReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  isPlaying: boolean;
  currentTime: number;
  currentAudioData: { base64: string; alignment: PhonemeAlignment } | null;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  clearError: () => void;
}

export function useChatState(): UseChatStateReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentAudioData, setCurrentAudioData] = useState<{
    base64: string;
    alignment: PhonemeAlignment;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    
    try {
      // Send message and get response
      const response = await sendChatMessage(message);
      
      // Create assistant message with response
      const assistantMessage: ChatMessage = {
        id: `assistant_${Date.now()}`,
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        audioBase64: response.audioBase64,
        alignment: response.alignment,
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Set up audio data if available
      if (response.audioBase64 && response.alignment) {
        setCurrentAudioData({
          base64: response.audioBase64,
          alignment: response.alignment,
        });
        // Auto-play audio
        setIsPlaying(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    isPlaying,
    currentTime,
    currentAudioData,
    error,
    sendMessage,
    setIsPlaying,
    setCurrentTime,
    clearError,
  };
}

