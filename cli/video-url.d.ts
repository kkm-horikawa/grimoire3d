export interface VideoEmbed {
  source: string;
  provider: "YouTube" | "Vimeo";
}
export function videoEmbed(value: string): VideoEmbed | undefined;
