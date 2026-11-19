export interface CoverOption {
  base: "red" | "green" | "blue";
  filter: string;
  edge: string;
  mobile: string;
  hue: string;
  dye: string;
  light: string;
  lettering?: string;
}
export const coverOptions: Readonly<Record<string, CoverOption>> & {
  red: CoverOption;
};

export function selectCover(id: string, requested?: string): string;
