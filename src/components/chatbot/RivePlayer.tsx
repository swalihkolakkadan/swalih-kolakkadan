import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { useRive, UseRiveParameters } from "@rive-app/react-webgl2";

/**
 * The TutorFinal.riv file has this structure:
 *   Main Artboard ("Artboard")
 *     └─ State Machine ("State Machine 1") – no direct inputs
 *     └─ Nested Artboard ("Character") – contains the actual inputs:
 *            • Number input "mouth" (0-11)
 *            • Triggers: "idleTrig", "talkingTrig", "waitingTrig"
 *
 * We use Rive's path-based APIs to reach into the nested artboard:
 *   rive.setNumberStateAtPath("mouth", value, "Character")
 *   rive.fireStateAtPath("talkingTrig", "Character")
 */

const NESTED_ARTBOARD = "Character";

export interface RivePlayerProps {
  className?: string;
  src: string;
  artboard?: string;
  isPlaying?: boolean;
  /** Rive mouth shape number (0-11). Set by RiveAvatar from Polly visemes. */
  mouthValue?: number;
}

const RivePlayer: React.FC<RivePlayerProps> = ({
  className,
  src,
  artboard,
  isPlaying = true,
  mouthValue,
}) => {
  const hasStartedRef = useRef(false);
  const lastMouthValueRef = useRef<number>(-1);
  const riveRef = useRef<any>(null);

  // ─── 1. Load Rive with autoplay ───────────────────────────────────────
  const riveParams: UseRiveParameters = useMemo(
    () => ({
      src,
      artboard,
      autoplay: true,
      onRiveReady: (instance: any) => {
        // Auto-detect and play the first state machine if available
        const machines = instance.stateMachineNames;
        if (machines?.length > 0) {
          instance.play(machines[0]);
        } else {
          const anims = instance.animationNames;
          if (anims?.length > 0) {
            instance.play(anims[0]);
          }
        }
      },
    }),
    [src, artboard],
  );

  const { rive, RiveComponent } = useRive(riveParams, {
    useDevicePixelRatio: true,
    fitCanvasToArtboardHeight: false,
    useOffscreenRenderer: true,
    shouldResizeCanvasToContainer: true,
  });

  // Keep a ref so callbacks always have the latest rive instance
  riveRef.current = rive;

  // ─── 2. Fire a trigger on the nested "Character" artboard ─────────────
  const fireTrigger = useCallback((triggerName: string) => {
    const r = riveRef.current;
    if (!r) return;
    try {
      // First try state machine inputs (in case the SM has direct inputs)
      const inputs = r.stateMachineInputs("State Machine 1") || [];
      const trig = inputs.find((i: any) => i.name === triggerName);
      if (trig && typeof trig.fire === "function") {
        trig.fire();
        console.log(`[RivePlayer] Fired trigger (SM input): ${triggerName}`);
      } else {
        // Fallback: path-based API targeting the nested "Character" artboard
        r.fireStateAtPath(triggerName, NESTED_ARTBOARD);
        console.log(`[RivePlayer] Fired trigger (path): ${triggerName}`);
      }
    } catch (err) {
      console.warn(`[RivePlayer] Failed to fire trigger '${triggerName}':`, err);
    }
  }, []);

  // ─── 3. Set the mouth number on the nested "Character" artboard ───────
  const setMouth = useCallback((value: number) => {
    const r = riveRef.current;
    if (!r) return;
    try {
      // First try state machine inputs
      const inputs = r.stateMachineInputs("State Machine 1") || [];
      const mouthInput = inputs.find((i: any) => i.name === "mouth");
      if (mouthInput) {
        mouthInput.value = value;
      } else {
        // Fallback: path-based API targeting the nested artboard
        r.setNumberStateAtPath("mouth", value, NESTED_ARTBOARD);
      }
    } catch (err) {
      console.warn("[RivePlayer] Failed to set mouth:", err);
    }
  }, []);

  // ─── 4. Fire idle trigger once when rive loads ────────────────────────
  useEffect(() => {
    if (!rive) return;

    console.log("[RivePlayer] Rive ready");
    console.log("[RivePlayer] State machines:", rive.stateMachineNames);
    console.log("[RivePlayer] Animations:", rive.animationNames);

    // Start in idle state
    fireTrigger("idleTrig");
  }, [rive, fireTrigger]);

  // ─── 5. Update mouth value via path-based API ─────────────────────────
  useLayoutEffect(() => {
    if (mouthValue == null) return;
    if (lastMouthValueRef.current === mouthValue) return;
    lastMouthValueRef.current = mouthValue;
    setMouth(mouthValue);
  }, [mouthValue, setMouth]);

  // ─── 6. Switch idle ↔ talking based on isPlaying ──────────────────────
  useEffect(() => {
    if (!rive) return;

    if (isPlaying) {
      hasStartedRef.current = true;
      rive.play();
      fireTrigger("talkingTrig");
    } else {
      rive.play(); // keep Rive running; just swap triggers
      if (hasStartedRef.current) {
        fireTrigger("waitingTrig");
      } else {
        fireTrigger("idleTrig");
      }
    }
  }, [rive, isPlaying, fireTrigger]);

  return <RiveComponent className={className} />;
};

export default RivePlayer;
