/**
 * Chat service for communicating with the backend API
 */
import type { PhonemeAlignment } from '../types/chatTypes';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Generate a unique session ID for the user
 */
export function getSessionId(): string {
  let sessionId = sessionStorage.getItem('chat_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('chat_session_id', sessionId);
  }
  return sessionId;
}

export interface ChatApiResponse {
  text: string;
  audioBase64?: string;
  alignment?: PhonemeAlignment;
}

/**
 * Send a chat message and get complete response
 */
export async function sendMessage(message: string): Promise<ChatApiResponse> {
  const sessionId = getSessionId();
  
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, session_id: sessionId }),
  });
  
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Try again tomorrow!');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return {
    text: data.text,
    audioBase64: data.audio_base64,
    alignment: data.alignment,
  };
}

