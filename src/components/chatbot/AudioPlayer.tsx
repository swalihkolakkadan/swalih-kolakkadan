import React, { useRef, useEffect, useCallback } from "react";

interface AudioPlayerProps {
  audioBase64: string | null;
  isPlaying: boolean;
  onTimeUpdate: (timeMs: number) => void;
  onEnded: () => void;
  onPlay: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioBase64,
  isPlaying,
  onTimeUpdate,
  onEnded,
  onPlay,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Update time on animation frame for smooth lip-sync
  const updateTime = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      onTimeUpdate(audioRef.current.currentTime * 1000);
      animationFrameRef.current = requestAnimationFrame(updateTime);
    }
  }, [onTimeUpdate]);

  // Handle audio source change
  useEffect(() => {
    if (!audioBase64 || !audioRef.current) return;

    // Create audio URL from base64
    const byteCharacters = atob(audioBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);

    audioRef.current.src = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [audioBase64]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !audioBase64) return;

    if (isPlaying) {
      audioRef.current.play().catch(console.error);
      animationFrameRef.current = requestAnimationFrame(updateTime);
    } else {
      audioRef.current.pause();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, audioBase64, updateTime]);

  const handleEnded = () => {
    onTimeUpdate(0);
    onEnded();
  };

  const handlePlay = () => {
    animationFrameRef.current = requestAnimationFrame(updateTime);
    onPlay();
  };

  return (
    <audio
      ref={audioRef}
      onEnded={handleEnded}
      onPlay={handlePlay}
      style={{ display: "none" }}
    />
  );
};

export default AudioPlayer;
