import { readdir, readFile, realpath, stat } from "node:fs/promises";
import { extname, isAbsolute, join, posix, relative, sep } from "node:path";
import { parse } from "yaml";
import { coverOptions } from "./cover-options.js";
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

async function readPages(root, directory, nested) {
  const entries = (
    await readdir(join(root, directory), { withFileTypes: true })
  )
    .filter((entry) => visibleEntry(entry.name))
    .sort((a, b) => sortNames(a.name, b.name));
  const pages = [];
  for (const entry of entries) {
    const path = posix.join(directory, entry.name);
    if (entry.isDirectory() && nested) {
      pages.push(...(await readPages(root, path, true)));
    } else if (entry.isFile() && isMarkdown(entry.name)) {
      const markdown = await readFile(join(root, path), "utf8");
      pages.push({ path, ...readMarkdown(markdown) });
    }
  }
  return pages;
}

function comparePages(a, b) {
  // Treat index.md as the first page of its folder, without reordering the folders.
  return sortNames(
    a.path.replace(/(^|\/)index\.md$/i, "$1!index.md"),
    b.path.replace(/(^|\/)index\.md$/i, "$1!index.md")
  );
}

function describeBook(pages, folder, fallback) {
  const index = pages.find(
    (page) =>
      page.path.toLowerCase() === posix.join(folder, "index.md").toLowerCase()
  );
  const id = folder || rootId;
  const title = index?.metadata.title || index?.heading || fallback;
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
    chapters: pages.sort(comparePages).map((page) => {
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
    outDir,
    description,
    siteUrl,
    socialImage,
    author,
    magicMode,
    footer,
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
    (outDir !== undefined && (typeof outDir !== "string" || !outDir.trim()))
  ) {
    throw new Error(
      "grimoire.yml: title and outDir must be text / title と outDir は文字列で指定してください。"
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
    outDir,
    description,
    socialImage,
    author,
    magicMode,
    footer: readFooter(footer),
    siteUrl: siteUrl && normalizeSiteUrl(siteUrl),
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
  const link = typeof url === "string" ? absoluteWebUrl(url) : undefined;
  if (!link) {
    throw new Error(
      "grimoire.yml: footer.url must be an absolute HTTP(S) URL."
    );
  }
  return { label: label.trim(), url: link.href };
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

export async function readLibrary(cwd, settings) {
  const { locale, title } = settings;
  const docs = await realpath(join(cwd, "docs")).catch((error) => {
    if (error.code === "ENOENT") throw missingMarkdown(locale);
    throw error;
  });
  const entries = (await readdir(docs, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && visibleEntry(entry.name))
    .sort((a, b) => sortNames(a.name, b.name));
  const books = [];
  const rootPages = await readPages(docs, "", false);
  if (rootPages.length)
    books.push(describeBook(rootPages, "", title ?? "Grimoire3D"));

  for (const { name } of entries) {
    const pages = await readPages(docs, name, true);
    if (pages.length)
      books.push(describeBook(pages, name, titleFromPath(name)));
  }
  if (!books.length) throw missingMarkdown(locale);

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
  const publishedBooks = [];
  const documents = [];
  for (const { id, title, cover, chapters } of books) {
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
    manifest: {
      locale,
      shelf,
      title: title ?? "Grimoire3D",
      description: settings.description,
      siteUrl: settings.siteUrl,
      socialImage,
      author: settings.author,
      magicMode: settings.magicMode,
      footer: settings.footer,
      books: books.map(({ id, title, cover }) => ({ id, title, cover })),
    },
    books: publishedBooks,
    documents,
    assets,
    issues: [...new Set(issues)].sort(sortNames),
  };
}

function missingMarkdown(locale) {
  return new Error(
    locale === "ja"
      ? "docs/ に Markdown がありません。docs/index.md に「# 最初の本」と書いてください。"
      : 'No Markdown in docs/. Start with "# My first book" in docs/index.md.'
  );
}
