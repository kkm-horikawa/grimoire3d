/// <reference types="vite/client" />
import type { CSSProperties } from "react";
import { coverOptions, selectCover } from "../../cli/cover-options.js";

// Visible cover bounds in each 600 × 760 shelf image, excluding transparent padding.
const art = {
  red: {
    src: new URL("./art/cover-red.avif", import.meta.url).href,
    compact: new URL("./art/cover-red-mobile.avif", import.meta.url).href,
    opaqueBounds: [40, 29, 531, 689],
  },
  blue: {
    src: new URL("./art/cover-blue.avif", import.meta.url).href,
    compact: new URL("./art/cover-blue-mobile.avif", import.meta.url).href,
    opaqueBounds: [8, 4, 582, 715],
  },
  green: {
    src: new URL("./art/cover-green.avif", import.meta.url).href,
    compact: new URL("./art/cover-green-mobile.avif", import.meta.url).href,
    opaqueBounds: [49, 42, 507, 637],
  },
} as const;
export type BindingColor = string;

export function coverFor(id: string, requested?: string) {
  const binding = selectCover(id, requested);
  const option = coverOptions[binding] ?? coverOptions.red;
  const style = {
    "--cover-filter": option.filter,
    "--cover-lettering": option.lettering,
    "--cover-title-shadow": option.lettering
      ? "0 1px 1px #fbe9c6b0"
      : undefined,
    "--leather-edge": option.edge,
    "--leather-filter": option.mobile,
  } as CSSProperties;
  return { ...art[option.base], ...option, binding, style };
}

const resting = import.meta.glob<string>("./art/resting-*.avif", {
  eager: true,
  query: "?url",
  import: "default",
});

export function restingImage(binding: string): string | undefined {
  return (
    resting[`./art/resting-${binding}.avif`] ??
    resting["./art/resting-red.avif"]
  );
}
