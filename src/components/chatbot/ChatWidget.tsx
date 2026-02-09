import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faKeyboard,
  faClockRotateLeft,
  faTimes,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import RiveAvatar from "./RiveAvatar";
import AudioPlayer from "./AudioPlayer";
import ChatMessage from "./ChatMessage";
import { useChatState } from "../../hooks/useChatState";
import { useSpeechToText } from "../../hooks/useSpeechToText";
import "../../styles/chatbot.css";

type Mode = "idle" | "talk" | "type";

const ChatWidget: React.FC = () => {
  const [mode, setMode] = useState<Mode>("idle");
  // isHovering state removed
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [latestResponse, setLatestResponse] = useState("");
  const [inputValue, setInputValue] = useState("");

  // hoverTimeoutRef removed
  const bubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  const {
    isSupported: isSttSupported,
    isListening,
    transcript,
    finalTranscript,
    error: sttError,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText();

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      // hoverTimeoutRef cleanup removed
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    };
  }, []);

  // Live transcript for display in talk mode
  const liveTranscript = (finalTranscript + " " + transcript).trim();

  // Hover handlers removed

  // Mobile: tap avatar to toggle action buttons
  const handleAvatarClick = () => {
    // No-op for now, or could trigger something else.
    // Previously toggled hover state.
  };

  // ---- Mode handlers ----
  const handleTalkClick = () => {
    setMode("talk");
    startListening();
  };

  const handleTypeClick = () => {
    setMode("type");
  };

  const handleClose = () => {
    if (isListening) stopListening();
    resetTranscript();
    setInputValue("");
    setMode("idle");
  };

  // ---- Talk mode: auto-send when STT finalizes ----
  useEffect(() => {
    if (mode === "talk" && !isListening && finalTranscript) {
      const message = finalTranscript.trim();
      if (message) {
        sendMessage(message);
      }
      resetTranscript();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, isListening, finalTranscript]);

  // ---- Talk mode: auto-restart listening after response plays ----
  useEffect(() => {
    if (mode !== "talk") return;
    if (messages.length === 0) return;
    if (isListening || isLoading || isPlaying) return;

    const timer = setTimeout(() => {
      startListening();
    }, 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, isListening, isLoading, isPlaying, messages.length]);

  // ---- Speech bubble: show on new assistant message ----
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant" && lastMessage.content) {
        setLatestResponse(lastMessage.content);
        setShowBubble(true);
        if (bubbleTimeoutRef.current) {
          clearTimeout(bubbleTimeoutRef.current);
        }
      }
    }
  }, [messages]);

  // ---- Speech bubble: auto-fade after TTS finishes ----
  useEffect(() => {
    if (showBubble && !isPlaying && !isLoading) {
      bubbleTimeoutRef.current = setTimeout(() => {
        setShowBubble(false);
      }, 8000);
    }
    return () => {
      if (bubbleTimeoutRef.current) {
        clearTimeout(bubbleTimeoutRef.current);
      }
    };
  }, [showBubble, isPlaying, isLoading]);

  // ---- Scroll history panel to bottom ----
  useEffect(() => {
    if (isHistoryOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isHistoryOpen]);

  // ---- Type mode: submit handler ----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    const message = inputValue.trim();
    setInputValue("");
    await sendMessage(message);
  };

  const showActions = mode === "idle";
  const bubbleVisible = showBubble && latestResponse;

  return (
    <>
      {/* Floating History Stack — Appears above avatar when history is open */}
      <div
        className={`fixed bottom-[180px] md:bottom-[100px] right-4 md:right-6 w-full max-w-[360px] max-h-[60vh] flex flex-col justify-end pointer-events-none z-[998] transition-all duration-300 ${
          isHistoryOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className="flex flex-col gap-2 overflow-y-auto p-4 chat-scrollbar bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 dark:border-white/10"
          style={{ maxHeight: "100%" }}
        >
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Chat History
            </span>
            <button
              onClick={() => setIsHistoryOpen(false)}
              className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 flex items-center justify-center text-[0.6rem] hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-4 text-neutral-400 dark:text-neutral-500 text-center text-sm">
              <p>No messages yet</p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating "Latest Response" Bubble — Only visible if history is CLOSED */}
      <div
        className={`chat-bubble-arrow fixed bottom-[180px] md:bottom-[80px] right-4 left-4 md:left-auto md:right-[calc(1.5rem+220px+1rem)] w-auto max-w-[360px] md:w-max mx-auto md:mx-0 min-w-[100px] p-3.5 pr-6 rounded-2xl rounded-br-sm bg-[#E9E9EB] dark:bg-[#262626]/95 text-black dark:text-white shadow-xl backdrop-blur-2xl z-[999] transition-all duration-[400ms] ${
          bubbleVisible && !isHistoryOpen
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-3 pointer-events-none"
        }`}
      >
        <p className="text-[0.85rem] leading-relaxed m-0 max-h-40 overflow-y-auto whitespace-pre-wrap chat-scrollbar">
          {latestResponse}
        </p>
        <button
          className="absolute -top-2 -right-2 w-[22px] h-[22px] rounded-full border-none cursor-pointer flex items-center justify-center text-[0.55rem] bg-black/55 dark:bg-white/25 text-white hover:bg-black/75 dark:hover:bg-white/45 transition-colors"
          onClick={() => setShowBubble(false)}
          aria-label="Dismiss"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      {/* Main Widget Container — avatar at absolute bottom, everything stacks above */}
      <div
        className="fixed bottom-0 right-2 md:right-6 flex flex-col items-center z-[1000]"
        // onMouseEnter/Leave removed
      >
        {/* Error Toast — topmost when visible */}
        {(error || sttError) && mode !== "idle" && (
          <div className="mb-2 max-w-[260px] px-3 py-2 rounded-xl bg-red-100/90 dark:bg-red-950/35 border border-red-300/25 dark:border-red-500/30 backdrop-blur-sm flex items-center gap-2 chat-fade-in-up">
            <p className="text-xs text-red-600 dark:text-red-300 m-0 flex-1 leading-snug">
              {error || sttError}
            </p>
            <button
              onClick={clearError}
              className="text-[0.65rem] text-red-600 dark:text-red-300 bg-transparent border-none cursor-pointer underline whitespace-nowrap font-[inherit]"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Talk Mode — live transcript (above buttons) */}
        {mode === "talk" && (
          <div className="mb-2 max-w-[250px] text-center chat-fade-in-up">
            {isListening ? (
              liveTranscript ? (
                <p className="text-[0.8rem] text-neutral-600 dark:text-neutral-300 bg-white/85 dark:bg-neutral-800/85 px-3.5 py-1.5 rounded-full backdrop-blur-sm shadow-sm m-0 max-h-[60px] overflow-y-auto whitespace-pre-wrap break-words">
                  {liveTranscript}
                </p>
              ) : (
                <p className="text-xs text-neutral-400 dark:text-neutral-500 m-0">
                  Listening...
                </p>
              )
            ) : isLoading ? (
              <p className="text-xs text-neutral-400 dark:text-neutral-500 m-0">
                <span className="inline-flex gap-1 items-center">
                  <span
                    className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </span>
              </p>
            ) : null}
          </div>
        )}

        {/* Avatar Section — sits at the absolute bottom */}
        <div
          className="relative w-[160px] h-[160px] md:w-[220px] md:h-[220px] cursor-pointer drop-shadow-lg hover:scale-105 hover:drop-shadow-xl transition-all duration-300"
          onClick={handleAvatarClick}
        >
          {/* Pulsing Ring — visible in talk mode */}
          {mode === "talk" && (
            <div
              className={`absolute -inset-1.5 rounded-full border-[3px] border-transparent pointer-events-none -z-10 ${
                isListening
                  ? "chat-ring-listening"
                  : isPlaying
                    ? "chat-ring-playing"
                    : ""
              }`}
            />
          )}

          {/* Rive Avatar */}
          <div className="w-full h-full overflow-hidden">
            <RiveAvatar
              className="w-full h-full"
              alignment={currentAudioData?.alignment}
              currentTimeMs={currentTime}
              isPlaying={isPlaying}
              isListening={isListening}
            />
          </div>

          {/* Close Button (overlay, top-right) — active modes only */}
          {mode !== "idle" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="absolute top-1 right-1 w-[30px] h-[30px] rounded-full border-none cursor-pointer flex items-center justify-center text-[0.7rem] bg-red-500/90 text-white shadow-md z-[2] hover:bg-red-600 transition-colors duration-200 chat-pop-in"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}

          {/* Action Buttons — icon-only, float at bottom of avatar */}
          <div
            className={`absolute top-3/4 left-1/2 -translate-x-1/2 flex gap-2 z-[3] transition-all duration-300 ${
              showActions
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-1 pointer-events-none"
            }`}
          >
            {isSttSupported && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleTalkClick();
                }}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border-none cursor-pointer flex items-center justify-center text-sm bg-gradient-to-br from-amber-600 to-amber-700 dark:from-amber-400 dark:to-amber-500 text-white dark:text-slate-900 shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
                aria-label="Talk to me"
              >
                <FontAwesomeIcon icon={faMicrophone} />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleTypeClick();
              }}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full border-none cursor-pointer flex items-center justify-center text-sm bg-white/90 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-300 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:shadow-xl hover:bg-white dark:hover:bg-neutral-700"
              aria-label="Type a message"
            >
              <FontAwesomeIcon icon={faKeyboard} />
            </button>
            {messages.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHistoryOpen(true);
                }}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border-none cursor-pointer flex items-center justify-center text-sm bg-white/90 dark:bg-neutral-800/90 text-neutral-600 dark:text-neutral-300 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:shadow-xl hover:bg-white dark:hover:bg-neutral-700"
                aria-label="Chat history"
              >
                <FontAwesomeIcon icon={faClockRotateLeft} />
              </button>
            )}
          </div>

          {/* Type Mode — compact input at same position as buttons */}
          {mode === "type" && (
            <form
              onSubmit={(e) => {
                e.stopPropagation();
                handleSubmit(e);
              }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-3/4  flex items-center gap-1.5 z-[3] chat-pop-in"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Message..."
                disabled={isLoading}
                autoFocus
                className="w-[100px] md:w-[140px] px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/95 dark:bg-neutral-800/95 text-neutral-900 dark:text-neutral-200 text-xs font-[inherit] outline-none backdrop-blur-sm shadow-lg transition-all duration-200 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-[#007AFF] dark:focus:border-[#0A84FF]"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="w-6 h-6 md:w-7 md:h-7 min-w-[24px] md:min-w-[28px] rounded-full border-none cursor-pointer flex items-center justify-center text-xs bg-gradient-to-br from-[#007AFF] to-[#005EC4] dark:from-[#0A84FF] dark:to-[#007AFF] text-white shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Audio Player (hidden) */}
      <AudioPlayer
        audioBase64={currentAudioData?.base64 || null}
        isPlaying={isPlaying}
        onTimeUpdate={setCurrentTime}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </>
  );
};

export default ChatWidget;
