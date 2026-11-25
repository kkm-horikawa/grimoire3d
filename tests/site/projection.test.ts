import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { readFrame } from "../../src/site/projection";

const stylesheet = readFileSync(
  resolve(import.meta.dirname, "../../src/site/style.css"),
  "utf8"
);

describe("readFrame", () => {
  it("uses 91% of stage height on standard desktop and laptop stages", () => {
    const desktop = readFrame(1920, 994);
    expect(desktop.width).toBeCloseTo(1920 * 0.86, 5);
    expect(desktop.height).toBeCloseTo(994 * 0.91, 5);

    const laptop = readFrame(1440, 744);
    expect(laptop.width).toBeCloseTo(1440 * 0.86, 5);
    expect(laptop.height).toBeCloseTo(744 * 0.91, 5);
  });

  it("caps frame width on ultrawide stages and height on narrow tall stages", () => {
    const ultrawide = readFrame(2560, 600);
    expect(ultrawide.width).toBeCloseTo(600 * 2.2, 5);
    expect(ultrawide.height).toBeCloseTo(600 * 0.91, 5);

    const narrow = readFrame(700, 1000);
    expect(narrow.width).toBeCloseTo(700 * 0.86, 5);
    expect(narrow.height).toBeCloseTo(700 * 0.82, 5);
  });

  it("stays synchronized with static-reader CSS variables to avoid layout shift", () => {
    const readingHeight = stylesheet.match(
      /\.reader-stage\[data-frame="reading"\]\s*\{[^}]*\n\s*height:\s*([^;]+);/
    )?.[1];
    const staticHeight = stylesheet.match(
      /\.static-reader\s+\.reader-stage\s*\{[^}]*--read-stage-height:\s*([^;]+);/
    )?.[1];
    const staticPaperHeight = stylesheet.match(
      /\.static-reader\s+\.reader-stage\s*\{[^}]*--read-paper-height:\s*([^;]+);/
    )?.[1];

    expect(readingHeight).toBeTruthy();
    expect(staticHeight).toBe(readingHeight);
    expect(staticPaperHeight).toContain("* .91");
  });
});
