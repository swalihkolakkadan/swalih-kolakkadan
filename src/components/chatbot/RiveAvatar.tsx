import React, { useMemo } from "react";
import RivePlayer from "./RivePlayer";
import type { PhonemeAlignment } from "../../types/chatTypes";

export interface RiveAvatarProps {
  className?: string;
  alignment?: PhonemeAlignment;
  currentTimeMs?: number;
  isPlaying?: boolean;
  artboardName?: string;
}

const RiveAvatar: React.FC<RiveAvatarProps> = ({
  className,
  alignment,
  currentTimeMs = 0,
  isPlaying = true,
  artboardName = "Artboard",
}) => {
  const src = "/TutorFinal.riv";

  const mouthPhoneme = useMemo(() => {
    if (!alignment) return undefined;

    const characters = alignment.characters || [];
    const starts = alignment.character_start_times_seconds || [];

    if (characters.length === 0 || starts.length === 0) return undefined;
    if (!isPlaying) return "IDLE";

    const tSec = (currentTimeMs || 0) / 1000;
    const total = starts.length;

    // Binary search for last index with start <= tSec
    let idx = 0;
    let low = 0;
    let high = total - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (starts[mid] <= tSec) {
        idx = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    const curr = String(characters[idx] || "");
    const next = String(characters[idx + 1] || "");

    const isAlpha = (s: string) => /^[A-Za-z]$/.test(s);
    const isNonAlpha = (s: string) => !isAlpha(s);

    // Idle when two consecutive non-alpha characters
    if (isNonAlpha(curr) && isNonAlpha(next)) return "IDLE";
    if (isNonAlpha(curr)) return undefined;

    // Handle digraphs
    if (isAlpha(curr) && isAlpha(next)) {
      const pair = (curr + next).toUpperCase();
      if (["TH", "SH", "CH", "HA"].includes(pair)) {
        return pair;
      }
    }

    const upper = curr.toUpperCase();
    const validPhonemes = [
      "P",
      "B",
      "M",
      "A",
      "E",
      "I",
      "O",
      "Y",
      "Z",
      "C",
      "D",
      "N",
      "S",
      "X",
      "Q",
      "W",
      "F",
      "V",
      "G",
      "K",
      "L",
    ];

    return validPhonemes.includes(upper) ? upper : undefined;
  }, [alignment, currentTimeMs, isPlaying]);

  return (
    <RivePlayer
      className={className}
      src={src}
      artboard={artboardName}
      isPlaying={isPlaying}
      mouthPhoneme={mouthPhoneme}
    />
  );
};

export default RiveAvatar;
