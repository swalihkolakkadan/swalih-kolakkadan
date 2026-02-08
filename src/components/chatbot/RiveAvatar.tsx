import React, { useMemo } from "react";
import RivePlayer from "./RivePlayer";
import type { SpeechAlignment } from "../../types/chatTypes";

/**
 * Direct mapping from Amazon Polly visemes to Rive mouth shape numbers.
 *
 * Rive mouth shapes (from the "mouth" state-machine input in TutorFinal.riv):
 *   0 = IDLE   (closed / rest)
 *   1 = P/B/M  (bilabial – lips pressed together)
 *   2 = A/E/I  (open vowels)
 *   3 = D/N/S  (alveolar – tongue tip up, slightly open)
 *   4 = TH     (dental fricative – tongue between teeth)
 *   5 = SH/CH  (postalveolar – lips rounded forward)
 *   6 = W/U/Q  (rounded, small opening)
 *   7 = O      (rounded, open)
 *   8 = HA     (wide-open mouth)
 *   9 = F/V    (labiodental – upper teeth on lower lip)
 *  10 = G/K    (velar – back of throat)
 *  11 = L/R    (lateral / rhotic – tongue up)
 *
 * Amazon Polly visemes (case-sensitive):
 *   p, t, k, f, T, s, S, r, a, e, i, o, u, E, O, @, sil
 */
const POLLY_VISEME_TO_MOUTH: Record<string, number> = {
  // Silence / rest
  sil: 0,

  // Consonants
  p: 1, // bilabial (p, b, m)
  t: 3, // alveolar (t, d, n, l)
  k: 10, // velar (k, g, ng)
  f: 9, // labiodental (f, v)
  T: 4, // dental fricative (th)
  s: 3, // alveolar fricative (s, z)
  S: 5, // postalveolar (sh, ch, j, zh)
  r: 11, // rhotic (r)

  // Vowels
  a: 2, // open (ah – "father")
  e: 2, // mid-front (eh – "bed")
  i: 2, // close-front (ee – "bee")
  o: 7, // mid-back rounded (oh – "boat")
  u: 6, // close-back rounded (oo – "boot")

  // Uppercase vowel variants from Polly
  E: 2, // schwa / mid-central (uh – "the")
  O: 7, // open-mid back (aw – "saw")

  // Neutral / schwa represented by @
  "@": 2,
};

export interface RiveAvatarProps {
  className?: string;
  alignment?: SpeechAlignment;
  currentTimeMs?: number;
  isPlaying?: boolean;
  isListening?: boolean;
  artboardName?: string;
}

const RiveAvatar: React.FC<RiveAvatarProps> = ({
  className,
  alignment,
  currentTimeMs = 0,
  isPlaying = true,
  isListening = false,
  artboardName = "Artboard",
}) => {
  const src = "/TutorFinal.riv";

  const mouthValue = useMemo<number>(() => {
    // Not playing or no alignment data -> idle
    if (!isPlaying || !alignment?.visemes?.length) {
      return 0;
    }

    const tSec = (currentTimeMs || 0) / 1000;
    const visemes = alignment.visemes;

    // Before the first viseme starts -> idle
    if (tSec < visemes[0].time) {
      return 0;
    }

    // Binary search: find the last viseme with time <= tSec
    let idx = 0;
    let low = 0;
    let high = visemes.length - 1;

    while (low <= high) {
      const mid = (low + high) >> 1; // fast integer division
      if (visemes[mid].time <= tSec) {
        idx = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    const currentViseme = visemes[idx].viseme;
    return POLLY_VISEME_TO_MOUTH[currentViseme] ?? 0;
  }, [alignment, currentTimeMs, isPlaying]);

  return (
    <RivePlayer
      className={className}
      src={src}
      artboard={artboardName}
      isPlaying={isPlaying}
      isListening={isListening}
      mouthValue={mouthValue}
    />
  );
};

export default RiveAvatar;
