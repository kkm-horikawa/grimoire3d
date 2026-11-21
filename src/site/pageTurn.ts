export type TurnDirection = 1 | -1;
export const turnFaces = ["left", "right", "front", "back"] as const;
export type TurnFace = (typeof turnFaces)[number];

export interface TurnPanel {
  index: number;
  side: "left" | "right";
}

export interface TurnPlan {
  to: number;
  direction: TurnDirection;
  panels: Record<TurnFace, TurnPanel>;
}

export interface PreparedTurn {
  plan: TurnPlan;
  ink: Record<TurnFace, HTMLCanvasElement | null>;
}

export function spreadStart(index: number, wide: boolean): number {
  return wide ? Math.floor(index / 2) * 2 : index;
}

/**
 * Returns the section anchor needed to address a page when turning leaves.
 *
 * A chapter's opening sheet already resolves from the chapter id alone, so
 * omitting its first heading anchor keeps page turns at the top of the h1.
 */
export function pageTurnAnchor(
  pages: readonly { id: string; section?: { id: string } }[],
  index: number
): string | undefined {
  const target = pages[index];
  if (!target) return undefined;
  const isChapterStart = index === 0 || pages[index - 1]?.id !== target.id;
  return isChapterStart ? undefined : target.section?.id;
}

export function planPageTurn(from: number, to: number): TurnPlan | null {
  const source = spreadStart(from, true);
  const destination = spreadStart(to, true);
  if (source === destination) return null;
  const direction = source < destination ? 1 : -1;
  const earlier = Math.min(source, destination);
  const later = Math.max(source, destination);
  // A chapter jump keeps the visible and destination spreads on the turning surfaces.
  return {
    to,
    direction,
    panels: {
      left: { index: earlier, side: "left" },
      right: { index: later + 1, side: "right" },
      front: { index: earlier + 1, side: "right" },
      back: { index: later, side: "left" },
    },
  };
}
