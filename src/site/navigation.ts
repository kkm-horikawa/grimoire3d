import { readerPath, readLegacyRoute } from "../../cli/routes.js";

const staticRoot = document.querySelector<HTMLMetaElement>(
  'meta[name="grimoire-static"]'
)?.content;
const root = new URL(staticRoot || "./", location.href);
const paper = document.querySelector<HTMLElement>("[data-initial-book]");
const shelf = document.querySelector<HTMLElement>("[data-initial-shelf]");
export const initialSmallScreenArt =
  !location.hash.startsWith("#/") &&
  matchMedia("(max-width: 699px)").matches &&
  (paper || shelf)
    ? paper
      ? "paper"
      : "shelf"
    : undefined;

// Reuse the server-painted artwork when upgrading readable static HTML.
export const initialPaper = initialSmallScreenArt ? null : paper;
export const initialShelfArt = initialSmallScreenArt ? null : shelf;
export const shelfHref = staticRoot ? root.href : "#/";

export function assetHref(path: string): string {
  return new URL(path, root).href;
}

export function bookHref(book: string, page?: string, anchor?: string): string {
  if (staticRoot) {
    return (
      assetHref(readerPath(book, page)) +
      (anchor ? `#${encodeURIComponent(anchor)}` : "")
    );
  }
  const route = `#/${encodeURIComponent(book)}`;
  if (page === undefined) return route;
  const chapter = `${route}/${encodeURIComponent(page)}`;
  return anchor ? `${chapter}?anchor=${encodeURIComponent(anchor)}` : chapter;
}

export function resolveHref(path: string): string {
  if (path.startsWith("#/")) {
    const { book, page, anchor } = readLegacyRoute(path);
    return book ? bookHref(book, page, anchor ?? undefined) : shelfHref;
  }
  return path.startsWith("./") ? assetHref(path) : path;
}

export function readLocation(): ReturnType<typeof readLegacyRoute> {
  if (!staticRoot || location.hash.startsWith("#/"))
    return readLegacyRoute(location.hash);
  try {
    const [prefix, book, ...pages] = location.pathname
      .slice(root.pathname.length)
      .replace(/(?:\/)?index\.html$/i, "")
      .replace(/\/$/, "")
      .split("/");
    return {
      book: prefix === "read" && book ? decodeURIComponent(book) : undefined,
      page: pages.length ? pages.map(decodeURIComponent).join("/") : undefined,
      anchor: location.hash ? decodeURIComponent(location.hash.slice(1)) : null,
    };
  } catch {
    return { book: undefined, page: undefined, anchor: null };
  }
}

export function navigate(href: string): void {
  if (new URL(href, location.href).href === location.href) return;
  if (staticRoot) {
    history.pushState(null, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  } else {
    location.hash = href;
  }
}

export function interceptReaderLink(event: MouseEvent): void {
  if (
    !staticRoot ||
    event.button !== 0 ||
    event.defaultPrevented ||
    event.metaKey ||
    event.altKey ||
    event.shiftKey ||
    event.ctrlKey ||
    !(event.target instanceof Element)
  )
    return;
  const link = event.target.closest<HTMLAnchorElement>("a[href]");
  if (!link || link.download || (link.target && link.target !== "_self"))
    return;
  const url = new URL(link.href);
  if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname))
    return;
  const relative = url.pathname.slice(root.pathname.length);
  if (relative && !relative.startsWith("read/")) return;
  event.preventDefault();
  navigate(url.href);
}
