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
  isPlaying?: boolean;
  mouthPhoneme?: string;
}

const RivePlayer: React.FC<RivePlayerProps> = ({
  className,
  src,
  artboard,
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
      autoplay: true,
      onRiveReady: (instance: any) => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        // Auto-detect and play the first state machine or animation
        const machines = instance.stateMachineNames;
        if (machines && machines.length > 0) {
          instance.play(machines[0]);
          return;
        }
        const anims = instance.animationNames;
        if (anims && anims.length > 0) {
          instance.play(anims[0]);
          return;
        }
        instance.play();
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

  // Fire idle trigger once on first ready
  useEffect(() => {
    if (!rive) return;
    if (!idleTriggeredRef.current) {
      idleTriggeredRef.current = true;
      fireTrigger("idleTrig");
    }
  }, [rive]);

  // Update mouth input when phoneme changes
  useEffect(() => {
    if (!rive || !mouthPhoneme) return;

    const key = mouthPhoneme.trim().toUpperCase();
    const value = PHONEME_TO_MOUTH[key];
    if (typeof value !== "number") return;

    try {
      const inputs = rive.stateMachineInputs("Character") || [];
      const mouthInput = inputs.find((i) => i.name === "mouth");
      if (mouthInput) {
        mouthInput.value = value;
      }
    } catch (err) {
      console.warn("[RivePlayer] Failed to set mouth input:", err);
    }
  }, [rive, mouthPhoneme]);

  // Switch between idle / talking based on isPlaying
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
