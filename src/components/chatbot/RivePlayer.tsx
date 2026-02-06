import React, { useEffect, useMemo, useRef } from "react";
import { useRive, UseRiveParameters } from "@rive-app/react-webgl2";

const PHONEME_TO_MOUTH: Record<string, number> = {
  IDLE: 0,
  P: 1,
  B: 1,
  M: 1,
  A: 2,
  E: 2,
  I: 2,
  Y: 3,
  Z: 3,
  C: 3,
  D: 3,
  N: 3,
  S: 3,
  X: 3,
  TH: 4,
  SH: 5,
  CH: 5,
  Q: 6,
  W: 6,
  O: 7,
  HA: 8,
  F: 9,
  V: 9,
  G: 10,
  K: 10,
  L: 11,
};

export interface RivePlayerProps {
  className?: string;
  src: string;
  artboard?: string;
  animations?: string | string[];
  stateMachines?: string | string[];
  isPlaying?: boolean;
  mouthPhoneme?: string;
}

const RivePlayer: React.FC<RivePlayerProps> = ({
  className,
  src,
  artboard,
  animations,
  stateMachines,
  isPlaying = true,
  mouthPhoneme,
}) => {
  const initializedRef = useRef(false);
  const idleTriggeredRef = useRef(false);
  const hasStartedRef = useRef(false);

  const riveParams: UseRiveParameters = useMemo(
    () => ({
      src,
      artboard,
      animations,
      stateMachines,
      autoplay: true,
      onLoad: () => {
        initializedRef.current = true;
      },
    }),
    [src, artboard, animations, stateMachines],
  );

  const { rive, RiveComponent } = useRive(riveParams, {
    useDevicePixelRatio: true,
    fitCanvasToArtboardHeight: false,
    useOffscreenRenderer: true,
    shouldResizeCanvasToContainer: true,
  });

  // Fire a state machine trigger
  const fireTrigger = (triggerName: string) => {
    if (!rive) return;
    try {
      const inputs = rive.stateMachineInputs("Character") || [];
      const trig = inputs.find((i: any) => i.name === triggerName);
      if (trig && typeof (trig as any).fire === "function") {
        (trig as any).fire();
      }
    } catch (err) {
      console.warn("[RivePlayer] Failed to fire trigger:", triggerName, err);
    }
  };

  // Initialize on ready
  useEffect(() => {
    if (!rive) return;
    try {
      const machines = rive.stateMachineNames || [];
      if (machines.includes("Character") && !idleTriggeredRef.current) {
        idleTriggeredRef.current = true;
        fireTrigger("idleTrig");
      }
    } catch {}
  }, [rive]);

  // Update mouth when phoneme changes
  useEffect(() => {
    if (!rive || !mouthPhoneme) return;

    const key = mouthPhoneme.trim().toUpperCase();
    const value = PHONEME_TO_MOUTH[key];

    if (typeof value === "number") {
      try {
        const inputs = rive.stateMachineInputs("Character") || [];
        const mouthInput = inputs.find((i) => i.name === "mouth");
        if (mouthInput && typeof mouthInput.value === "number") {
          mouthInput.value = value;
        }
      } catch (err) {
        console.warn("[RivePlayer] Failed to set mouth:", err);
      }
    }
  }, [rive, mouthPhoneme]);

  // Handle play/pause state
  useEffect(() => {
    if (!rive) return;

    if (isPlaying) {
      hasStartedRef.current = true;
      rive.play();
      fireTrigger("talkingTrig");
    } else {
      rive.play();
      if (hasStartedRef.current) {
        fireTrigger("waitingTrig");
      } else {
        fireTrigger("idleTrig");
      }
    }
  }, [rive, isPlaying]);

  return <RiveComponent className={className} />;
};

export default RivePlayer;
