import { describe, expect, it } from "vitest";
import { planPageTurn, spreadStart } from "../../src/site/pageTurn";

describe("turning one physical leaf", () => {
  it("turns page 2 with page 3 printed on its reverse", () => {
    expect(planPageTurn(0, 2)).toEqual({
      direction: 1,
      to: 2,
      panels: {
        left: { index: 0, side: "left" },
        right: { index: 3, side: "right" },
        front: { index: 1, side: "right" },
        back: { index: 2, side: "left" },
      },
    });
  });

  it("uses the same four surfaces when turning backward from a right-hand page", () => {
    const forward = planPageTurn(3, 4);
    const backward = planPageTurn(5, 3);
    expect(forward?.direction).toBe(1);
    expect(backward?.direction).toBe(-1);
    expect(backward?.to).toBe(3);
    expect(forward?.panels).toEqual({
      left: { index: 2, side: "left" },
      right: { index: 5, side: "right" },
      front: { index: 3, side: "right" },
      back: { index: 4, side: "left" },
    });
    expect(backward?.panels).toEqual(forward?.panels);
  });

  it("pairs 1 with 2 and 3 with 4 and keeps same-spread links in place", () => {
    expect([0, 1, 2, 3].map((index) => spreadStart(index, true))).toEqual([
      0, 0, 2, 2,
    ]);
    expect(planPageTurn(0, 1)).toBeNull();
    expect(planPageTurn(2, 3)).toBeNull();
    expect(spreadStart(2, false)).toBe(2);
  });
  it("turns from the current spread directly to a distant chapter in both directions", () => {
    const forward = planPageTurn(0, 5);
    const backward = planPageTurn(5, 0);
    expect(forward).toMatchObject({
      direction: 1,
      to: 5,
      panels: {
        left: { index: 0, side: "left" },
        right: { index: 5, side: "right" },
        front: { index: 1, side: "right" },
        back: { index: 4, side: "left" },
      },
    });
    expect(backward).toMatchObject({ direction: -1, to: 0 });
    expect(backward?.panels).toEqual(forward?.panels);
  });
});
