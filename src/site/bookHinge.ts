export const coverPerspective = 2300;

interface HorizontalBounds {
  left: number;
  right: number;
}

// The fore edge is the boundary between the turning cover and the exposed spread.
export function spreadReveal(
  stage: HorizontalBounds,
  spine: number,
  leafWidth: number,
  coverWidth: number,
  openAngle: number
): Keyframe[] {
  const frameMargin = 64;
  const openRadians = (openAngle * Math.PI) / 180;
  const paperRight = spine + leafWidth;

  return Array.from({ length: 25 }, (_, index) => {
    const offset = index / 24;
    const angle = offset * openRadians;
    const depth = coverWidth * Math.sin(angle);
    const edge =
      spine + (leafWidth * Math.cos(angle)) / (1 - depth / coverPerspective);
    const rightMargin = Math.max(0, Math.min(1, (offset - 0.35) / 0.4));
    const leftMargin = Math.max(0, (offset - 0.8) / 0.2);
    const right =
      paperRight + (stage.right + frameMargin - paperRight) * rightMargin;
    const left = Math.min(
      right,
      edge + (stage.left - frameMargin - edge) * leftMargin
    );

    return {
      offset,
      clipPath: `inset(-${frameMargin}px ${stage.right - right}px -${frameMargin}px ${left - stage.left}px)`,
    };
  });
}
