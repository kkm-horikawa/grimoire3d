/** @param {string} book @param {string} [chapter] */
export function readerPath(book, chapter) {
  const segments = chapter && chapter !== "index" ? chapter.split("/") : [];
  return `read/${[book, ...segments].map(encodeURIComponent).join("/")}/`;
}

/** @param {string} hash */
export function readLegacyRoute(hash) {
  const [path, search] = hash.slice(1).split("?", 2);
  try {
    const [, book, chapter] = (path ?? "").split("/");
    return {
      book: book ? decodeURIComponent(book) : undefined,
      page: chapter ? decodeURIComponent(chapter) : undefined,
      anchor: new URLSearchParams(search).get("anchor"),
    };
  } catch {
    return { book: undefined, page: undefined, anchor: null };
  }
}
