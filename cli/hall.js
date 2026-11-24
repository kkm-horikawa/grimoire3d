import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createElement as element } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { coverOptions, selectCover } from "./cover-options.js";
import { LibraryFooter } from "./library-footer.js";

const RESERVED_IDS = new Set(["assets", "books", "content", "read", "search"]);
const SHELF_ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (symbol) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        symbol
      ]
  );
}

/** @param {string} value */
export function isSafeHref(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  const trimmed = value.trim();
  if (/^(?:\/(?!\/)|\.\.?\/)/.test(trimmed)) {
    return !/[\r\n\0]/.test(trimmed);
  }
  try {
    const url = new URL(trimmed);
    return (
      ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

/**
 * Validate and normalize the `shelves` section from `grimoire.yml`.
 * @param {unknown} raw
 */
export function parseShelvesConfig(raw) {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) {
    throw new Error("grimoire.yml: shelves must be a list of bookshelf items.");
  }
  const seen = new Set();
  return raw.map((item, index) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) {
      throw new Error(`grimoire.yml: shelves[${index}] must be an object.`);
    }
    const { id, title, description, docsDir, href, books } = item;
    if (typeof id !== "string" || !SHELF_ID_PATTERN.test(id)) {
      throw new Error(
        `grimoire.yml: shelves[${index}].id must use lowercase letters, digits, and hyphens.`
      );
    }
    if (RESERVED_IDS.has(id)) {
      throw new Error(
        `grimoire.yml: shelves[${index}].id "${id}" is reserved.`
      );
    }
    if (seen.has(id)) {
      throw new Error(`grimoire.yml: duplicate shelf id "${id}" in shelves.`);
    }
    seen.add(id);
    if (typeof title !== "string" || !title.trim()) {
      throw new Error(
        `grimoire.yml: shelves[${index}].title must be non-empty text.`
      );
    }
    if (description !== undefined && typeof description !== "string") {
      throw new Error(
        `grimoire.yml: shelves[${index}].description must be text.`
      );
    }
    if (
      docsDir !== undefined &&
      (typeof docsDir !== "string" || !docsDir.trim())
    ) {
      throw new Error(
        `grimoire.yml: shelves[${index}].docsDir must be non-empty text.`
      );
    }
    if (href !== undefined && !isSafeHref(href)) {
      throw new Error(
        `grimoire.yml: shelves[${index}].href must be an HTTP(S) URL or a relative path.`
      );
    }
    if (!docsDir && !href) {
      throw new Error(
        `grimoire.yml: shelves[${index}] ("${id}") must specify docsDir or href.`
      );
    }
    let parsedBooks;
    if (books !== undefined) {
      if (!Array.isArray(books)) {
        throw new Error(
          `grimoire.yml: shelves[${index}].books must be a list.`
        );
      }
      parsedBooks = books.slice(0, 3).map((book, bookIndex) => {
        if (!book || typeof book !== "object" || Array.isArray(book)) {
          throw new Error(
            `grimoire.yml: shelves[${index}].books[${bookIndex}] must be an object.`
          );
        }
        const { id: bookId, title: bookTitle, cover } = book;
        if (typeof bookTitle !== "string" || !bookTitle.trim()) {
          throw new Error(
            `grimoire.yml: shelves[${index}].books[${bookIndex}].title must be non-empty text.`
          );
        }
        if (cover !== undefined && !Object.hasOwn(coverOptions, cover)) {
          throw new Error(
            `grimoire.yml: shelves[${index}].books[${bookIndex}].cover "${String(cover)}" must be one of ${Object.keys(coverOptions).join(", ")}.`
          );
        }
        return {
          id:
            typeof bookId === "string" && bookId.trim()
              ? bookId.trim()
              : `${id}-${bookIndex + 1}`,
          title: bookTitle.trim(),
          cover,
        };
      });
    }
    return {
      id,
      title: title.trim(),
      description: description?.trim() || undefined,
      docsDir: docsDir?.trim(),
      href: href?.trim() ?? `./${encodeURIComponent(id)}/`,
      books: parsedBooks,
    };
  });
}

/**
 * Resolve preview books (1..3) for a shelf entry.
 * @param {{ id: string, title: string, books?: { id: string, title: string, cover?: string }[] }} shelf
 * @param {{ manifest: { books: { id: string, title: string, cover?: string }[] } } | undefined} childLibrary
 */
export function resolveShelfPreviews(shelf, childLibrary) {
  const source = shelf.books?.length
    ? shelf.books
    : childLibrary?.manifest.books.length
      ? childLibrary.manifest.books.slice(0, 3)
      : [{ id: shelf.id, title: shelf.title }];
  return source.slice(0, 3).map((book) => ({
    id: book.id,
    title: book.title,
    cover: selectCover(book.id, book.cover),
  }));
}

function defaultHallTitle(locale) {
  return locale === "ja" ? "書庫" : "Library Hall";
}

function defaultHallDescription(locale) {
  return locale === "ja"
    ? "読む書架を選んでください"
    : "Choose a bookshelf to explore";
}

function defaultHallBackLabel(locale, hallTitle) {
  return locale === "ja" ? `${hallTitle}に戻る` : `Back to ${hallTitle}`;
}

/**
 * Load a multi-shelf Library Hall and all local child libraries declared in settings.shelves.
 * @param {string} cwd
 * @param {any} settings
 * @param {(cwd: string, settings: any, docsDir?: string) => Promise<any>} loadLibrary
 */
export async function readLibraryHall(cwd, settings, loadLibrary) {
  const locale = settings.locale ?? "en";
  const hallTitle = settings.title?.trim() || defaultHallTitle(locale);
  const hallDescription =
    settings.description?.trim() ?? defaultHallDescription(locale);
  const children = new Map();
  const issues = [];
  const shelves = [];

  for (const shelf of settings.shelves ?? []) {
    let childLibrary;
    if (shelf.docsDir) {
      const childSiteUrl = settings.siteUrl
        ? new URL(`${encodeURIComponent(shelf.id)}/`, settings.siteUrl).href
        : undefined;
      const childSettings = {
        locale,
        title: shelf.title,
        description: shelf.description ?? settings.description,
        siteUrl: childSiteUrl,
        socialImage: settings.socialImage,
        author: settings.author,
        magicMode: settings.magicMode,
        footer: {
          label: defaultHallBackLabel(locale, hallTitle),
          url: "../",
        },
        headFile: settings.headFile,
      };
      childLibrary = await loadLibrary(cwd, childSettings, shelf.docsDir);
      children.set(shelf.id, childLibrary);
      for (const issue of childLibrary.issues) {
        issues.push(`[${shelf.id}] ${issue}`);
      }
    }
    shelves.push({
      id: shelf.id,
      title: shelf.title,
      description: shelf.description,
      href: shelf.href,
      books: resolveShelfPreviews(shelf, childLibrary),
    });
  }

  return {
    manifest: {
      locale,
      title: hallTitle,
      description: hallDescription,
      siteUrl: settings.siteUrl,
      author: settings.author,
      footer: settings.footer,
      shelves,
    },
    children,
    issues,
  };
}

function bookOpenIconSvg() {
  return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>';
}

function findAsset(assets, prefix, stem, ext) {
  const file = assets.find(
    (name) =>
      name.startsWith(`${stem}-`) &&
      !name.startsWith(`${stem}-mobile-`) &&
      !name.startsWith(`${stem}-sm-`) &&
      name.endsWith(ext)
  );
  return file ? `${prefix}assets/${file}` : "";
}

function startAfterArtwork(entry) {
  const path = JSON.stringify(entry);
  return `<script type="module">
    const events = ["pointerdown","keydown"];
    let started = false;
    function start() {
      if (started) return;
      started = true;
      for (const event of events) window.removeEventListener(event,start,true);
      void import(${path});
    }
    const art = [...document.querySelectorAll("link[data-first-art]")].find(link => matchMedia(link.media).matches);
    if (!art || !matchMedia("(max-width: 699px)").matches) start();
    else {
      for (const event of events) window.addEventListener(event,start,{capture:true,once:true});
      const image = new Image();
      const painted = () => requestAnimationFrame(() => requestAnimationFrame(start));
      image.addEventListener("load", painted, { once:true });
      image.addEventListener("error", painted, { once:true });
      image.src = art.href;
    }
    </script>`;
}

function staticBookPreview(book, index, count, assets, prefix) {
  const binding = selectCover(book.id, book.cover);
  const option = coverOptions[binding] ?? coverOptions.red;
  const coverSrc = findAsset(assets, prefix, `cover-${option.base}`, ".avif");
  const compactSrc =
    findAsset(assets, prefix, `cover-${option.base}-mobile`, ".avif") ||
    coverSrc;
  const spineSrc = findAsset(
    assets,
    prefix,
    `hall-spine-${option.base}`,
    ".webp"
  );
  const style = `--cover-filter:${option.filter};--leather-edge:${option.edge};`;
  const spineOnly = count > 1;
  return `<span class="hall-book${spineOnly ? " hall-book--stack" : " hall-book--solo"}" data-cover="${escapeHtml(binding)}" data-base="${escapeHtml(option.base)}" data-index="${index}" style="${style}" aria-hidden="true">
    <span class="hall-book-spine">${spineSrc ? `<img src="${escapeHtml(spineSrc)}" width="120" height="452" alt="" loading="lazy" decoding="async">` : ""}</span>
    <span class="hall-book-face">${coverSrc ? `<picture>${compactSrc ? `<source media="(max-width: 699px)" srcset="${escapeHtml(compactSrc)}">` : ""}<img src="${escapeHtml(coverSrc)}" width="600" height="760" alt="" loading="lazy" decoding="async"></picture>` : ""}</span>
  </span>`;
}

function staticHallBody(manifest, assets, prefix) {
  const emptyCopy =
    manifest.locale === "ja"
      ? "表示できる書架がありません。"
      : "No bookshelves are available.";
  const desktopAlcove = findAsset(assets, prefix, "hall-alcove", ".webp");
  const mobileAlcove =
    findAsset(assets, prefix, "hall-alcove-mobile", ".webp") || desktopAlcove;
  const smallMobileAlcove = findAsset(
    assets,
    prefix,
    "hall-alcove-mobile-sm",
    ".webp"
  );
  const alcovePicture = desktopAlcove
    ? `<picture class="hall-alcove-frame">${smallMobileAlcove ? `<source media="(max-width: 480px)" srcset="${escapeHtml(smallMobileAlcove)}" width="440" height="239">` : ""}${mobileAlcove ? `<source media="(max-width: 699px)" srcset="${escapeHtml(mobileAlcove)}" width="760" height="413">` : ""}<img class="hall-alcove-art" src="${escapeHtml(desktopAlcove)}" width="640" height="717" alt="" fetchpriority="high" decoding="async"></picture>`
    : "";
  const cards = manifest.shelves.length
    ? `<div class="hall-grid">${manifest.shelves
        .map((shelf) => {
          const books = shelf.books.slice(0, 3);
          return `<a class="hall-shelf" href="${escapeHtml(shelf.href)}" data-shelf="${escapeHtml(shelf.id)}">
            <div class="hall-alcove">
              ${alcovePicture}
              <div class="hall-plaque-slot"><h2 class="hall-plaque">${escapeHtml(shelf.title)}</h2></div>
              <div class="hall-books" data-count="${books.length}">${books.map((book, idx) => staticBookPreview(book, idx, books.length, assets, prefix)).join("")}</div>
            </div>
            ${shelf.description ? `<p class="hall-description">${escapeHtml(shelf.description)}</p>` : ""}
          </a>`;
        })
        .join("")}</div>`
    : `<p class="hall-empty">${escapeHtml(emptyCopy)}</p>`;
  return `<main class="library library-hall">
    <header class="library-brand brand">${bookOpenIconSvg()}<span>Grimoire3D</span></header>
    <div class="library-heading hall-heading">
      <h1>${escapeHtml(manifest.title)}</h1>
      ${manifest.description ? `<p class="hall-subtitle">${escapeHtml(manifest.description)}</p>` : ""}
    </div>
    ${cards}
    ${renderToStaticMarkup(element(LibraryFooter, { publisher: manifest.footer }))}
  </main>`;
}

/**
 * Render the Library Hall HTML shell and `shelves.json` into `destination`.
 */
export async function writeHallPages(
  templateDir,
  destination,
  manifest,
  headMarkup = ""
) {
  const template = await readFile(join(templateDir, "hall.html"), "utf8").catch(
    (error) => {
      if (error.code === "ENOENT") {
        return readFile(join(templateDir, "index.html"), "utf8");
      }
      throw error;
    }
  );
  const assets = await readdir(join(templateDir, "assets")).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  const prefix = "./";
  const canonical = manifest.siteUrl;
  const desktopAlcove = findAsset(assets, prefix, "hall-alcove", ".webp");
  const mobileAlcove = findAsset(assets, prefix, "hall-alcove-mobile", ".webp");
  const smallMobileAlcove = findAsset(
    assets,
    prefix,
    "hall-alcove-mobile-sm",
    ".webp"
  );
  const meta = [
    '<meta name="grimoire-hall" content="true">',
    `<meta name="grimoire-static" content="${prefix}">`,
    canonical && `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    manifest.description &&
      `<meta name="description" content="${escapeHtml(manifest.description)}">`,
    manifest.author &&
      `<meta name="author" content="${escapeHtml(manifest.author)}">`,
    desktopAlcove &&
      `<link rel="preload" as="image" data-first-art fetchpriority="high" media="(min-width: 700px)" href="${escapeHtml(desktopAlcove)}">`,
    mobileAlcove &&
      `<link rel="preload" as="image" data-first-art fetchpriority="high" media="${smallMobileAlcove ? "(481px <= width < 700px)" : "(max-width: 699px)"}" href="${escapeHtml(mobileAlcove)}">`,
    smallMobileAlcove &&
      `<link rel="preload" as="image" data-first-art fetchpriority="high" media="(max-width: 480px)" href="${escapeHtml(smallMobileAlcove)}">`,
    `<script type="application/json" id="grimoire-hall">${JSON.stringify(manifest).replace(/</g, "\\u003c")}</script>`,
  ]
    .filter(Boolean)
    .join("\n");

  let inlined = template.replace(/<link rel="modulepreload"[^>]*>\s*/g, "");
  const cssMatch =
    /<link rel="stylesheet"[^>]*href="\.\/assets\/([^"]+\.css)"[^>]*>/.exec(
      inlined
    );
  if (cssMatch) {
    const css = await readFile(
      join(templateDir, "assets", cssMatch[1]),
      "utf8"
    ).catch(() => "");
    if (css) {
      const rewritten = css
        .replace(/url\((["']?)\.\//g, "url($1./assets/")
        .replace(/<\/style/gi, "<\\/style");
      inlined = inlined.replace(
        cssMatch[0],
        () => `<style>${rewritten}</style>`
      );
    }
  }

  const body = staticHallBody(manifest, assets, prefix);
  let html = inlined
    .replace('<html lang="en">', `<html lang="${manifest.locale}">`)
    .replace(
      /<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/,
      (_, source) => startAfterArtwork(prefix + source.replace(/^\.\//, ""))
    )
    .replace(
      /<title>[^<]*<\/title>/,
      () => `<title>${escapeHtml(manifest.title)}</title>\n${meta}`
    )
    .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
  if (headMarkup) {
    html = html.replace(
      /<head>(\s*<meta charset="[^"]+"\s*\/?>)?/i,
      (start) => `${start}\n${headMarkup}\n`
    );
  }
  await mkdir(destination, { recursive: true });
  await writeFile(join(destination, "index.html"), html);
  await writeFile(join(destination, "shelves.json"), JSON.stringify(manifest));
}
