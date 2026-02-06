import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faTimes,
  faPaperPlane,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import RiveAvatar from "./RiveAvatar";
import AudioPlayer from "./AudioPlayer";
import ChatMessage from "./ChatMessage";
import { useChatState } from "../../hooks/useChatState";
import "../../styles/chatbot.css";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isMuted, setIsMuted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
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
  } = useChatState();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue.trim();
    setInputValue("");
    await sendMessage(message);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`chat-widget-button ${isOpen ? "hidden" : ""}`}
        aria-label="Open chat"
      >
        <FontAwesomeIcon icon={faComment} className="text-xl" />
      </button>

      {/* Chat Panel */}
      <div className={`chat-widget-panel ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="chat-widget-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              S
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white">
                Swalih
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {isLoading ? "Typing..." : "Ask me anything!"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              <FontAwesomeIcon
                icon={isMuted ? faVolumeMute : faVolumeUp}
                className="text-neutral-600 dark:text-neutral-400"
              />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              aria-label="Close chat"
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-neutral-600 dark:text-neutral-400"
              />
            </button>
          </div>
        </div>

        {/* Avatar Section */}
        <div className="chat-widget-avatar">
          <RiveAvatar
            className="w-full h-full"
            alignment={currentAudioData?.alignment}
            currentTimeMs={currentTime}
            isPlaying={isPlaying && !isMuted}
          />
        </div>

        {/* Messages */}
        <div className="chat-widget-messages">
          {messages.length === 0 && (
            <div className="text-center text-neutral-500 dark:text-neutral-400 py-8">
              <p className="text-sm">👋 Hi! I'm Swalih.</p>
              <p className="text-xs mt-1">
                Ask me about my work, projects, or anything else!
              </p>
            </div>
          )}
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg p-3 text-sm">
              {error}
              <button onClick={clearError} className="ml-2 underline">
                Dismiss
              </button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="chat-widget-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 bg-transparent outline-none text-neutral-900 dark:text-white placeholder-neutral-500"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-2 rounded-full bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>

      {/* Audio Player (hidden) */}
      {!isMuted && (
        <AudioPlayer
          audioBase64={currentAudioData?.base64 || null}
          isPlaying={isPlaying}
          onTimeUpdate={setCurrentTime}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        />
      )}
    </>
  );
};

export default ChatWidget;
