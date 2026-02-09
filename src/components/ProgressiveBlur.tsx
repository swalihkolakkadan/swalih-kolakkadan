import { cn } from "../utils/cn";

type ProgressiveBlurProps = {
  /**
   * Direction of the blur gradient
   * "to bottom" = max blur at top, min blur at bottom
   * "to top" = max blur at bottom, min blur at top
   */
  direction?: "to top" | "to bottom";
  /**
   * Maximum blur in pixels (at the blur-heavy end)
   */
  blurMax?: number;
  /**
   * Minimum blur in pixels (at the transparent end)
   */
  blurMin?: number;
  /**
   * Additional class names for the container
   */
  className?: string;
};

/**
 * Creates a truly progressive blur effect using stacked layers.
 * Each layer adds incremental blur, masked to create smooth gradient.
 */
const ProgressiveBlur = ({
  direction = "to bottom",
  blurMax = 8,
  blurMin = 0,
  className,
}: ProgressiveBlurProps) => {
  const isMaxBlurAtTop = direction === "to bottom";

  // Number of blur steps - more steps = smoother gradient
  const steps = 8;
  const blurRange = blurMax - blurMin;
  const blurIncrement = blurRange / steps;

  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {Array.from({ length: steps }).map((_, i) => {
        const stepIndex = i + 1;
        const blurAmount = blurMin + blurIncrement * stepIndex;

        // Each layer uses a gradient mask
        // For "to bottom" (max blur at top):
        //   - First layers (low blur) visible at bottom
        //   - Last layers (high blur) visible at top
        // The gradient creates smooth falloff

        // Calculate the coverage for this layer
        // Higher blur layers cover more toward the "blur max" direction
        const coverage = (stepIndex / steps) * 100;

        let maskGradient: string;
        if (isMaxBlurAtTop) {
          // Max blur at top: this layer visible from top down to its coverage point
          maskGradient = `linear-gradient(to bottom, black 0%, transparent ${coverage}%)`;
        } else {
          // Max blur at bottom: this layer visible from bottom up to its coverage point
          maskGradient = `linear-gradient(to top, black 0%, transparent ${coverage}%)`;
        }

        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blurAmount}px)`,
              WebkitBackdropFilter: `blur(${blurAmount}px)`,
              mask: maskGradient,
              WebkitMask: maskGradient,
            }}
          />
        );
      })}
    </div>
  );
};

export default ProgressiveBlur;
