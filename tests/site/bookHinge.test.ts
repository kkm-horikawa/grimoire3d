import { describe, expect, it } from "vitest";
import { spreadReveal } from "../../src/site/bookHinge";

const stage = { left: 24, right: 1144 };

function clippedWidth(frame: Keyframe): number {
  const [, right, , left] = String(frame.clipPath)
    .slice(6, -1)
    .split(" ")
    .map(Number.parseFloat);
  return stage.right - stage.left - right - left;
}

describe("revealing the spread behind the cover", () => {
  it.each([
    152, 179,
  ])("reveals no spread at the closed end of a %d degree hinge", (angle) => {
    const frames = spreadReveal(stage, 570, 480, 230, angle);
    expect(clippedWidth(frames[0])).toBe(0);
    expect(clippedWidth(frames[1])).toBe(0);
    expect(clippedWidth(frames[12])).toBeGreaterThan(0);
    expect(clippedWidth(frames.at(-1) ?? {})).toBeGreaterThan(
      stage.right - stage.left
    );
  });
});
