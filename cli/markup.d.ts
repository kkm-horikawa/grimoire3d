import type { Root } from "mdast";
import type { PluggableList, Plugin } from "unified";
export const remarkGrimoire: Plugin<[locale?: "en" | "ja"], Root>;
export function remarkPlugins(locale?: "en" | "ja"): PluggableList;
export function rehypePlugins(page: {
  id?: string;
  chapter?: string;
  section?: { id: string };
}): PluggableList;
export function markdownOptions(
  locale?: "en" | "ja"
): import("react-markdown").Options["remarkRehypeOptions"];
