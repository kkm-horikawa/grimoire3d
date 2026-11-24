import { readdir, readFile, realpath, stat } from "node:fs/promises";
import {
  basename,
  extname,
  isAbsolute,
  join,
  posix,
  relative,
  resolve,
  sep,
} from "node:path";
import { parse } from "yaml";
import { coverOptions } from "./cover-options.js";
import { isSafeHref, parseShelvesConfig } from "./hall.js";
import { readMarkdown } from "./markdown.js";

const rootId = "_root";
const languages = new Set(["en", "ja"]);
const collator = new Intl.Collator("en", { numeric: true });

function sortNames(a, b) {
  return collator.compare(a, b) || (a < b ? -1 : Number(a > b));
}

function titleFromPath(path) {
  return path.replace(/^\d+[-_]+/, "").replace(/[-_]+/g, " ");
}

function visibleEntry(name) {
  return !name.startsWith(".") && !name.startsWith("_") && name !== "assets";
}

function isMarkdown(name) {
  return extname(name).toLowerCase() === ".md";
}

function pageId(path) {
  return path.replace(/\.md$/i, "");
}

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

async function readPages(root, directory, nested, standalone) {
  const entries = (
    await readdir(join(root, directory), { withFileTypes: true })
  )
    .filter(
      (entry) =>
        visibleEntry(entry.name) &&
        ((entry.isDirectory() && nested) ||
          (entry.isFile() && isMarkdown(entry.name)))
    )
    .sort((a, b) => sortNames(a.name, b.name));
  const index = entries.find(
    (entry) => entry.isFile() && /^index\.md$/i.test(entry.name)
  );
  const indexPath = index && posix.join(directory, index.name);
  const introduction = index && {
    path: indexPath,
    ...readMarkdown(await readFile(join(root, indexPath), "utf8")),
  };
  const ownBook = directory.includes("/") && introduction?.metadata.book;
  const order = introduction?.metadata.chapters;
  const selected = [];
  if (order !== undefined) {
    if (!Array.isArray(order))
      throw new Error(
        `${indexPath}: chapters must be a list of direct Markdown files or folders.`
      );
    const seen = new Set();
    for (const item of order) {
      const name = typeof item === "string" ? item.replace(/\/$/, "") : "";
      const entry = entries.find((entry) => entry.name === name);
      if (
        !name ||
        name.includes("/") ||
        !entry ||
        (item.endsWith("/") && !entry.isDirectory())
      )
        throw new Error(
          `${indexPath}: chapters entry "${String(item)}" must name a direct Markdown file or folder in this book.`
        );
      if (seen.has(name))
        throw new Error(
          `${indexPath}: chapters contains duplicate entry "${name}".`
        );
      seen.add(name);
      selected.push(entry);
    }
  }
  const pages = introduction ? [introduction] : [];
  if (ownBook) standalone.set(directory, pages);
  for (const entry of [
    ...selected,
    ...entries.filter((entry) => !selected.includes(entry)),
  ]) {
    if (entry === index) continue;
    const path = posix.join(directory, entry.name);
    if (entry.isDirectory()) {
      pages.push(...(await readPages(root, path, true, standalone)));
    } else {
      pages.push({
        path,
        ...readMarkdown(await readFile(join(root, path), "utf8")),
      });
    }
  }
  return ownBook ? [] : pages;
}

function readPublicationDate(index) {
  const raw = index?.metadata.date;
  const date = typeof raw === "string" ? raw.trim() : raw;
  if (date == null || date === "") return undefined;

  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const parsed = new Date(date);
    if (
      Number.isFinite(parsed.getTime()) &&
      parsed.toISOString().slice(0, 10) === date
    )
      return date;
  }
  throw new Error(
    `${index.path}: date must be a valid publication date in YYYY-MM-DD format.`
  );
}

function describeBook(pages, folder, fallback, configuredTitle) {
  const index = pages.find(
    (page) =>
      page.path.toLowerCase() === posix.join(folder, "index.md").toLowerCase()
  );
  const readme = pages.find(
    (page) =>
      page.path.toLowerCase() === posix.join(folder, "README.md").toLowerCase()
  );
  // Reserve a prefix that ordinary top-level folder names cannot use.
  const id = folder.includes("/")
    ? `_book-${folder.replaceAll("-", "-h").replaceAll("/", "--")}`
    : folder || rootId;
  const title =
    index?.metadata.title ||
    index?.heading ||
    configuredTitle ||
    readme?.firstHeading ||
    fallback;
  const cover = index?.metadata.cover;
  if (cover && !Object.hasOwn(coverOptions, cover)) {
    throw new Error(
      `${index.path}: cover "${cover}" must be one of ${Object.keys(coverOptions).join(", ")}.`
    );
  }
  const groups = new Map(
    pages
      .filter((page) => /\/index\.md$/i.test(page.path))
      .map((page) => [posix.dirname(page.path), page.heading])
  );
  return {
    id,
    title,
    cover,
    category: index?.metadata.category,
    date: readPublicationDate(index),
    coverImage: index?.metadata.coverImage && {
      path: index.path,
      value: index.metadata.coverImage,
    },
    chapters: pages.map((page) => {
      const group = posix.dirname(page.path);
      const inBook = folder ? page.path.slice(folder.length + 1) : page.path;
      const file = posix.basename(pageId(page.path));
      const groupTitle =
        group !== (folder || ".")
          ? groups.get(group) || titleFromPath(posix.basename(group))
          : undefined;
      return {
        id: pageId(inBook),
        path: page.path,
        title:
          page.metadata.title ||
          page.heading ||
          (file === "index" ? groupTitle || title : titleFromPath(file)),
        group: groupTitle,
        sheets: page.sheets,
        metadata: page.metadata,
        hasTitle: Boolean(page.heading),
        excerpt: page.excerpt,
        searchSections: page.searchSections,
        markdown: page.markdown,
        headingIds: page.headingIds,
        urls: page.urls,
      };
    }),
  };
}

function inside(parent, path) {
  const fromParent = relative(parent, path);
  return (
    fromParent !== ".." &&
    !fromParent.startsWith(`..${sep}`) &&
    !isAbsolute(fromParent)
  );
}

export async function readSettings(cwd) {
  let source;
  try {
    source = await readFile(join(cwd, "grimoire.yml"), "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return { locale: "en" };
    throw error;
  }
  let settings;
  try {
    settings = parse(source) ?? {};
  } catch {
    throw new Error(
      "grimoire.yml contains invalid YAML / grimoire.yml の YAML を確認してください。"
    );
  }
  const {
    locale = "en",
    title,
    docsDir,
    outDir,
    description,
    siteUrl,
    socialImage,
    author,
    magicMode,
    footer,
    headFile,
    shelves,
  } = settings;
  if (
    typeof settings !== "object" ||
    Array.isArray(settings) ||
    !languages.has(locale)
  ) {
    throw new Error(
      "grimoire.yml: set locale to en or ja / locale は en または ja を指定してください。"
    );
  }
  if (
    (title !== undefined && typeof title !== "string") ||
    [docsDir, outDir].some(
      (value) =>
        value !== undefined && (typeof value !== "string" || !value.trim())
    )
  ) {
    throw new Error(
      "grimoire.yml: title, docsDir and outDir must be text / title、docsDir、outDir は文字列で指定してください。"
    );
  }
  if (
    [description, siteUrl, socialImage, author].some(
      (value) =>
        value !== undefined && (typeof value !== "string" || !value.trim())
    ) ||
    (magicMode !== undefined && typeof magicMode !== "boolean")
  )
    throw new Error(
      "grimoire.yml: description, siteUrl, socialImage and author must be text, and magicMode must be true or false."
    );

  return {
    locale,
    title,
    docsDir,
    outDir,
    description,
    socialImage,
    author,
    magicMode,
    footer: readFooter(footer),
    headFile,
    siteUrl: siteUrl && normalizeSiteUrl(siteUrl),
    shelves: parseShelvesConfig(shelves),
  };
}

function absoluteWebUrl(value) {
  try {
    const url = new URL(value);
    if (
      ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    )
      return url;
  } catch {}
  return undefined;
}

function readFooter(footer) {
  if (footer === undefined) return undefined;
  if (typeof footer?.label !== "string" || !footer.label.trim()) {
    throw new Error("grimoire.yml: footer.label must be non-empty text.");
  }
  const { label, url } = footer;
  if (url === undefined) return { label: label.trim() };
  if (typeof url === "string" && isSafeHref(url)) {
    const absolute = absoluteWebUrl(url);
    return { label: label.trim(), url: absolute ? absolute.href : url.trim() };
  }
  throw new Error(
    "grimoire.yml: footer.url must be an HTTP(S) URL or a relative path."
  );
}

function normalizeSiteUrl(value) {
  const url = absoluteWebUrl(value);
  if (!url || url.search || url.hash) {
    throw new Error(
      "grimoire.yml: siteUrl must be an absolute HTTP(S) URL without a query or fragment."
    );
  }
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return url.href;
}

async function loadLink(url, page, links, docs, assets, issues) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/)/i.test(url)) return undefined;
  const match = /^([^?#]*)(\?[^#]*)?(#.*)?$/.exec(url);
  if (!match) return undefined;
  const [, path, query = "", anchor = ""] = match;
  let decoded;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    issues.push(`${page.path}: ${url}`);
    return "";
  }
  const target = path
    ? posix.normalize(posix.join(posix.dirname(page.path), decoded))
    : page.path;
  const targetPage =
    links.get(target) ?? links.get(posix.join(target, "index.md"));
  if (targetPage) {
    const fragment = anchor.slice(1);
    if (!fragment) return targetPage;
    try {
      return `${targetPage}?anchor=${encodeURIComponent(decodeURIComponent(fragment))}`;
    } catch {
      return `${targetPage}?anchor=${encodeURIComponent(fragment)}`;
    }
  }
  if (target.startsWith("../") || target === ".." || !path) {
    issues.push(`${page.path}: ${url}`);
    return "";
  }
  try {
    const absolute = await realpath(join(docs, target));
    if (!inside(docs, absolute) || !(await stat(absolute)).isFile()) {
      issues.push(`${page.path}: ${url}`);
      return "";
    }
    assets.set(target, absolute);
    return `./content/${encodePath(target)}${query}${anchor}`;
  } catch (error) {
    if (!["ENOENT", "ENOTDIR"].includes(error.code)) throw error;
    issues.push(`${page.path}: ${url}`);
    return "";
  }
}

async function projectTitle(cwd) {
  const filename = join(cwd, "package.json");
  try {
    const name = JSON.parse(await readFile(filename, "utf8"))?.name;
    if (typeof name === "string" && name.trim()) return name.trim();
  } catch (error) {
    if (error.code !== "ENOENT" && !(error instanceof SyntaxError)) throw error;
  }
  return basename(cwd);
}

export async function readLibrary(
  cwd,
  settings,
  docsDir = settings.docsDir ?? "docs"
) {
  const { locale, title } = settings;
  if (!docsDir.trim()) throw new Error("--docs-dir must name a directory.");
  const docs = await realpath(resolve(cwd, docsDir)).catch((error) => {
    if (["ENOENT", "ENOTDIR"].includes(error.code))
      throw missingMarkdown(locale, docsDir);
    throw error;
  });
  const entries = (
    await readdir(docs, { withFileTypes: true }).catch((error) => {
      if (error.code === "ENOTDIR") throw missingMarkdown(locale, docsDir);
      throw error;
    })
  )
    .filter((entry) => entry.isDirectory() && visibleEntry(entry.name))
    .sort((a, b) => sortNames(a.name, b.name));
  const books = [];
  const rootPages = await readPages(docs, "", false);
  if (rootPages.length)
    books.push(
      describeBook(rootPages, "", locale === "ja" ? "概要" : "Overview", title)
    );

  for (const { name } of entries) {
    const standalone = new Map();
    const pages = await readPages(docs, name, true, standalone);
    if (pages.length)
      books.push(describeBook(pages, name, titleFromPath(name)));
    for (const [folder, chapters] of standalone)
      books.push(
        describeBook(chapters, folder, titleFromPath(posix.basename(folder)))
      );
  }
  if (!books.length) throw missingMarkdown(locale, docsDir);

  const shelf = books.some((book) => book.id !== rootId);
  const assets = new Map();
  const links = new Map();
  const issues = [];
  for (const book of books) {
    for (const page of book.chapters) {
      links.set(
        page.path,
        `#/${encodeURIComponent(book.id)}/${encodeURIComponent(page.id)}`
      );
    }
  }
  async function socialAsset(value, path) {
    if (!value) return undefined;
    const remote = absoluteWebUrl(value);
    if (remote) return remote.href;
    if (/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(value)) {
      issues.push(`${path}: ${value}`);
      return undefined;
    }
    const image = await loadLink(
      value,
      { path },
      new Map(),
      docs,
      assets,
      issues
    );
    return image || undefined;
  }
  const socialImage = await socialAsset(settings.socialImage, "index.md");
  const summaries = [];
  const publishedBooks = [];
  const documents = [];
  const searchBooks = [];
  for (const {
    id,
    title,
    cover,
    category,
    date,
    coverImage,
    chapters,
  } of books) {
    let artwork;
    if (coverImage) {
      const { path, value } = coverImage;
      const extension = extname(value.split(/[?#]/, 1)[0]).toLowerCase();
      if (
        ![".avif", ".gif", ".jpeg", ".jpg", ".png", ".webp"].includes(extension)
      ) {
        throw new Error(
          `${path}: coverImage must point to an AVIF, GIF, JPEG, PNG, or WebP file.`
        );
      }
      artwork = await loadLink(value, { path }, links, docs, assets, issues);
      if (!artwork?.startsWith("./content/")) {
        throw new Error(
          `${path}: coverImage "${value}" must be a readable local image inside docs/.`
        );
      }
    }
    summaries.push({ id, title, cover, category, date, coverImage: artwork });
    searchBooks.push({
      id,
      title,
      sections: chapters.flatMap((chapter) =>
        chapter.searchSections.map((section) => ({
          chapter: chapter.id,
          title: chapter.title,
          ...section,
        }))
      ),
    });
    const pages = [];
    for (const chapter of chapters) {
      const {
        id: chapterId,
        title: chapterTitle,
        group,
        sheets,
        urls,
      } = chapter;
      const paths = await Promise.all(
        urls.map(async (url) => [
          url,
          await loadLink(url, chapter, links, docs, assets, issues),
        ])
      );
      const chapterLinks = Object.fromEntries(
        paths.filter(([, path]) => path !== undefined)
      );
      for (const sheet of sheets) {
        pages.push({
          id: chapterId,
          title: chapterTitle,
          group,
          ...sheet,
          links: chapterLinks,
        });
      }
      documents.push({
        book: id,
        chapter: chapterId,
        title: chapterTitle,
        hasTitle: chapter.hasTitle,
        noindex: chapter.metadata.noindex,
        description:
          chapter.metadata.description ||
          chapter.excerpt ||
          settings.description,
        socialImage:
          (await socialAsset(chapter.metadata.socialImage, chapter.path)) ||
          socialImage,
        markdown: chapter.markdown,
        headingIds: chapter.headingIds,
        links: chapterLinks,
      });
    }
    publishedBooks.push({ id, title, cover, pages });
  }
  return {
    docsDirectory: docs,
    manifest: {
      locale,
      shelf,
      title: title ?? (await projectTitle(cwd)),
      description: settings.description,
      siteUrl: settings.siteUrl,
      socialImage,
      author: settings.author,
      magicMode: settings.magicMode,
      footer: settings.footer,
      books: summaries,
    },
    books: publishedBooks,
    documents,
    searchBooks,
    assets,
    issues: [...new Set(issues)].sort(sortNames),
  };
}

function missingMarkdown(locale, docsDir) {
  const index = join(docsDir, "index.md");
  return new Error(
    locale === "ja"
      ? `${docsDir} に Markdown がありません。${index} に「# 最初の本」と書いてください。`
      : `No Markdown in ${docsDir}. Start with "# My first book" in ${index}.`
  );
}
