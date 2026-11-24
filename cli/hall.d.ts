export interface HallBookPreview {
  id: string;
  title: string;
  cover: string;
}

export interface HallShelfConfig {
  id: string;
  title: string;
  description?: string;
  docsDir?: string;
  href: string;
  books?: { id: string; title: string; cover?: string }[];
}

export interface HallShelf {
  id: string;
  title: string;
  description?: string;
  href: string;
  books: HallBookPreview[];
}

export interface LibraryHallManifest {
  locale: "en" | "ja";
  title: string;
  description?: string;
  siteUrl?: string;
  author?: string;
  footer?: { label: string; url?: string };
  shelves: HallShelf[];
}

export function isSafeHref(value: string): boolean;
export function parseShelvesConfig(raw: unknown): HallShelfConfig[] | undefined;
export function resolveShelfPreviews(
  shelf: {
    id: string;
    title: string;
    books?: { id: string; title: string; cover?: string }[];
  },
  childLibrary?: {
    manifest: { books: { id: string; title: string; cover?: string }[] };
  }
): HallBookPreview[];
export function readLibraryHall(
  cwd: string,
  settings: Record<string, unknown>,
  loadLibrary: (
    cwd: string,
    settings: Record<string, unknown>,
    docsDir?: string
  ) => Promise<unknown>
): Promise<{
  manifest: LibraryHallManifest;
  children: Map<string, unknown>;
  issues: string[];
}>;
export function writeHallPages(
  templateDir: string,
  destination: string,
  manifest: LibraryHallManifest,
  headMarkup?: string
): Promise<void>;
