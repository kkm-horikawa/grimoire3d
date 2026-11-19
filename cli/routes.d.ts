export function readerPath(book: string, chapter?: string): string;
export function readLegacyRoute(hash: string): {
  book: string | undefined;
  page: string | undefined;
  anchor: string | null;
};
