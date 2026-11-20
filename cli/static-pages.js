import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createElement as element } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import Markdown, { defaultUrlTransform } from "react-markdown";
import { BookCover } from "./book-cover.js";
import { coverOptions, selectCover } from "./cover-options.js";
import { LibraryFooter } from "./library-footer.js";
import { markdownOptions, rehypePlugins, remarkPlugins } from "./markup.js";
import { readerPath, readLegacyRoute } from "./routes.js";
import { ShelfPlate, shelfGroups } from "./shelf-groups.js";
import { videoEmbed } from "./video-url.js";

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (symbol) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        symbol
      ]
  );
}

const noindexMeta = '<meta name="robots" content="noindex">';

export function previewHead(manifest) {
  return [
    '<meta name="grimoire-preview" content="live">',
    noindexMeta,
    manifest.description &&
      `<meta name="description" content="${escapeHtml(manifest.description)}">`,
  ]
    .filter(Boolean)
    .join("\n");
}

function pageHead(site, page, route, prefix) {
  const canonical = site.siteUrl && new URL(route, site.siteUrl).href;
  const title =
    page.title !== site.title ? `${page.title} · ${site.title}` : site.title;
  const description = page.description || site.description;
  const image = page.socialImage || site.socialImage;
  const imageUrl =
    image &&
    (site.siteUrl
      ? new URL(image, site.siteUrl).href
      : image.startsWith("./")
        ? prefix + image.slice(2)
        : image);
  const metadata = [
    `<meta name="grimoire-static" content="${prefix}">`,
    canonical && `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    page.noindex && noindexMeta,
    description &&
      `<meta name="description" content="${escapeHtml(description)}">`,
    site.author && `<meta name="author" content="${escapeHtml(site.author)}">`,
    ...Object.entries({
      "og:type": page.chapter ? "article" : "website",
      "og:title": title,
      "og:site_name": site.title,
      "og:description": description,
      "og:url": canonical,
      "og:image": imageUrl,
      "og:locale": site.locale === "ja" ? "ja_JP" : "en_US",
    })
      .filter(([, value]) => value)
      .map(
        ([key, value]) =>
          `<meta property="${key}" content="${escapeHtml(value)}">`
      ),
    `<meta name="twitter:card" content="${imageUrl ? "summary_large_image" : "summary"}">`,
  ];
  if (canonical) {
    const data = page.chapter
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: page.title,
          mainEntityOfPage: canonical,
          url: canonical,
          inLanguage: site.locale,
          description,
          image: imageUrl,
          author: site.author
            ? { "@type": "Person", name: site.author }
            : undefined,
        }
      : {
          "@context": "https://schema.org",
          "@type": route ? "CollectionPage" : "WebSite",
          name: page.title,
          url: canonical,
          inLanguage: site.locale,
          description,
        };
    metadata.push(
      `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`
    );
  }
  return { title, canonical, metadata: metadata.filter(Boolean).join("\n") };
}

function markdownContent(page, locale, prefix, anchors = true) {
  const components = Object.fromEntries(
    ["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => [
      tag,
      ({ node, children, id, className }) =>
        element(
          tag,
          {
            className,
            id: anchors
              ? (page.headingIds?.[node?.position?.start.offset] ?? id)
              : id,
          },
          children
        ),
    ])
  );
  components.img = ({ src, alt, title }) => {
    if (!src) return element("span", null, alt);
    const embed = videoEmbed(src);
    if (embed) return element("a", { href: src }, alt || embed.provider);
    if (/\.mp4(?:[?#]|$)/i.test(src)) {
      return element("video", {
        src,
        controls: true,
        preload: "metadata",
        playsInline: true,
        "aria-label": alt || title,
      });
    }
    return element("img", { src, alt: alt || "", title, loading: "lazy" });
  };
  return renderToStaticMarkup(
    element(
      Markdown,
      {
        components,
        remarkPlugins: remarkPlugins(locale),
        rehypePlugins: rehypePlugins(page),
        remarkRehypeOptions: markdownOptions(locale),
        urlTransform(url) {
          let target = page.links[url];
          try {
            target ??= page.links[decodeURI(url)];
          } catch {}
          if (target === "") return undefined;
          if (target?.startsWith("#/")) {
            const { book, page: chapter, anchor } = readLegacyRoute(target);
            if (!book) return prefix;
            return (
              prefix +
              readerPath(book, chapter) +
              (anchor ? `#${encodeURIComponent(anchor)}` : "")
            );
          }
          return target?.startsWith("./")
            ? prefix + target.slice(2)
            : defaultUrlTransform(url);
        },
      },
      page.markdown
    )
  );
}

function initialBookMarkup(book, chapter, locale) {
  if (!book) return undefined;
  const first = Math.max(
    0,
    book.pages.findIndex((page) => page.id === chapter)
  );
  const other = first % 2 === 0 ? first + 1 : first - 1;
  return {
    ...book,
    pages: book.pages.map((page, index) => {
      if (
        (index !== first && index !== other) ||
        page.group ||
        page.markdown.includes("![") ||
        Object.keys(page.links).length
      )
        return page;
      const preparedHtml = markdownContent(page, locale, "./");
      // Interactive media, wide tables and diagrams are enhanced by the reader when needed.
      if (/<(?:video|img|table)\b|language-mermaid/.test(preparedHtml))
        return page;
      return { ...page, preparedHtml };
    }),
  };
}

function replaceShell(template, site, head, prefix, body, reader, headMarkup) {
  const html = template
    .replace('<html lang="en">', `<html lang="${site.locale}">`)
    .replace(
      /<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/,
      (_, source) =>
        startAfterArtwork(
          prefix + source.replace(/^\.\//, ""),
          reader ? `${prefix}assets/${reader}` : undefined
        )
    )
    .replace(
      /\b(src|href)="\.\/assets\//g,
      (_, attribute) => `${attribute}="${prefix}assets/`
    )
    .replace(
      /<title>[^<]*<\/title>/,
      () => `<title>${escapeHtml(head.title)}</title>\n${head.metadata}`
    )
    .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
  return headMarkup
    ? html.replace(
        /<head>(\s*<meta charset="[^"]+"\s*\/?>)?/i,
        (start) => `${start}\n${headMarkup}\n`
      )
    : html;
}

function startAfterArtwork(entry, reader) {
  const path = JSON.stringify(entry);
  const readerPath = JSON.stringify(reader ?? "");
  return `<script type="module">
    const events = ["pointerdown","keydown"];
    let started = false;
    function start() {
      if (started) return;
      started = true;
      for (const event of events) window.removeEventListener(event,start,true);
      const reader = ${readerPath};
      if (reader) {
        const preload = document.createElement("link");
        preload.rel = "modulepreload";
        preload.href = reader;
        document.head.append(preload);
      }
      void import(${path});
    }
    const art = [...document.querySelectorAll("link[data-first-art]")].find(link => matchMedia(link.media).matches);
    if (!art || !matchMedia("(max-width: 699px)").matches) start();
    else {
      for (const event of events) window.addEventListener(event,start,{capture:true,once:true});
      const image = new Image();
      const painted = () => requestAnimationFrame(() => requestAnimationFrame(start));
      // The CSS background owns the decode. Wait for its bytes without decoding another bitmap.
      image.addEventListener("load", painted, { once:true });
      image.addEventListener("error", painted, { once:true });
      image.src = art.href;
    }
    </script>`;
}

function linkList(items) {
  return `<ul>${items.map(({ href, title }) => `<li><a href="${escapeHtml(href)}">${escapeHtml(title)}</a></li>`).join("")}</ul>`;
}

function assetNamed(assets, prefix, name, ext = ".avif") {
  const asset = assets.find(
    (file) =>
      file.startsWith(`${name}-`) &&
      !file.startsWith(`${name}-sm-`) &&
      file.endsWith(ext)
  );
  return asset ? `${prefix}assets/${asset}` : undefined;
}

function staticShelf(site, prefix, assets, label) {
  const categorized = site.books.some((book) => book.category);
  const ordered = categorized
    ? shelfGroups(site.books).flatMap((group) => group.books)
    : site.books;
  const books = ordered.slice(0, 12);
  // Enhance the entire bookshelf together when adding catalog controls or custom art.
  const reuseShelfArt = !site.books.some(
    (book) => book.category || book.date || book.coverImage
  );
  const button = site.locale === "ja" ? "目録" : "Index";
  const titleStyle = (finish) =>
    finish.lettering
      ? `--cover-lettering:${finish.lettering};--cover-title-shadow:0 1px 1px #fbe9c6b0;`
      : "";
  function coverMarkup(book) {
    const finish = coverOptions[selectCover(book.id, book.cover)];
    const cover = assets.find(
      (file) =>
        file.startsWith(`cover-${finish.base}-`) &&
        !file.startsWith(`cover-${finish.base}-mobile-`) &&
        file.endsWith(".avif")
    );
    const mobileCover = assetNamed(
      assets,
      prefix,
      `cover-${finish.base}-mobile`
    );
    const style = `--cover-filter:${finish.filter};${titleStyle(finish)}`;
    const face = renderToStaticMarkup(
      element(BookCover, {
        title: book.title,
        src: cover && `${prefix}assets/${cover}`,
        compact: mobileCover,
        artwork: book.coverImage && prefix + book.coverImage.slice(2),
        loading: books.indexOf(book) < 3 ? "eager" : "lazy",
      })
    );
    return `<div class="shelf-cell"><a class="volume" href="${prefix + escapeHtml(readerPath(book.id))}" aria-label="${escapeHtml(book.title)}" style="${style}">${face}</a></div>`;
  }
  const grid = (items) =>
    `<div class="shelf-grid">${items.map(coverMarkup).join("")}</div>`;
  const contents = categorized
    ? shelfGroups(books)
        .map((group) => {
          const category =
            group.category ??
            (site.locale === "ja" ? "その他の本" : "Other books");
          return `<section class="category-shelf shelf-grid" aria-label="${escapeHtml(category)}">${renderToStaticMarkup(element(ShelfPlate, { category }))}${group.books.map(coverMarkup).join("")}</section>`;
        })
        .join("")
    : `<div class="shelf-art"${reuseShelfArt ? " data-initial-shelf" : ""} aria-hidden="true"></div>${grid(books)}`;
  return `<main class="library"><header class="library-brand brand">${escapeHtml(site.title)}</header>
  <div class="library-heading${site.books.length > 6 ? " library-heading-sticky" : ""}"><h1>${label}</h1></div>
  <div class="shelf ${categorized ? "shelf-categorized shelf-many" : `resting-shelf${site.books.length > 6 ? " shelf-many" : ""}`}"${!categorized && books.length >= 3 && books.length <= 4 ? ' data-mobile-rows="2"' : ""}>${contents}</div>
  ${site.books.length > 12 ? `<details><summary>${button}</summary>${linkList(site.books.map((book) => ({ title: book.title, href: prefix + readerPath(book.id) })))}</details>` : ""}
  ${renderToStaticMarkup(element(LibraryFooter, { publisher: site.footer }))}
  </main>`;
}

function staticChapter({ site, book, page, prefix, assets, libraryLabel }) {
  const index = Math.max(
    0,
    book.pages.findIndex((sheet) => sheet.id === page.chapter)
  );
  const left = index % 2 === 0;
  const neighbor = book.pages[index + (left ? 1 : -1)];
  const paired = neighbor?.id !== page.chapter ? neighbor : undefined;
  const finish = selectCover(
    book.id,
    book.cover ?? (!site.shelf ? "red" : undefined)
  );
  const option = coverOptions[finish];
  const background = assetNamed(assets, prefix, `resting-${finish}`);
  const label = site.locale === "ja" ? "目次" : "Contents";
  const magic = site.locale === "ja" ? "超魔導" : "Spell mode";
  const previous = book.pages[index - 1];
  const next = book.pages[index + 1];
  function linkTo(sheet, symbol, alt) {
    const path =
      sheet &&
      prefix +
        readerPath(book.id, sheet.id) +
        (sheet.section ? `#${encodeURIComponent(sheet.section.id)}` : "");
    return path
      ? `<a class="turn-button" href="${escapeHtml(path)}" aria-label="${alt}">${symbol}</a>`
      : `<button class="turn-button" disabled aria-label="${alt}">${symbol}</button>`;
  }
  return `<main class="reader static-reader">
    <header class="reader-header"${site.magicMode ? ' data-magic-control="true"' : ""}>
      <a class="brand" href="${prefix}">${libraryLabel}</a>
      ${site.magicMode ? `<span data-fallback-magic>${magic}</span>` : ""}
      <a class="contents-button" href="${prefix + escapeHtml(readerPath(book.id))}">${label}</a>
    </header>
    <div class="reader-stage" data-frame="reading" data-binding="${finish}" style="--leather-edge:${option.edge};--leather-filter:${option.mobile}">
      <div class="book-fallback" data-initial-book="${escapeHtml(book.id)}" aria-hidden="true">${background ? `<div class="book-resting" style="background-image:url('${background}')"></div>` : ""}</div>
      <div class="book-sheet book-sheet--right${left ? " static-main-left" : ""}">
        <article class="page-text">${page.hasTitle ? "" : `<h1>${escapeHtml(page.title)}</h1>`}${markdownContent(page, site.locale, prefix)}</article>
        <span class="folio-number" aria-hidden="true">${index + 1}</span>
      </div>
      ${paired ? `<div class="book-sheet book-sheet--${left ? "right" : "left"} static-neighbor"><article class="page-text">${markdownContent(paired, site.locale, prefix, false)}</article><span class="folio-number" aria-hidden="true">${index + (left ? 2 : 0)}</span></div>` : ""}
    </div>
    <nav class="reader-pagination" aria-label="${label}">
      ${linkTo(previous, "‹", site.locale === "ja" ? "前のページ" : "Previous page")}
      <div class="reading-position"><span>${escapeHtml(page.title)}</span><span>${index + 1} / ${book.pages.length}</span></div>
      ${linkTo(next, "›", site.locale === "ja" ? "次のページ" : "Next page")}
    </nav>
  </main>`;
}

export async function writeStaticPages(
  templateDir,
  destination,
  library,
  headMarkup = ""
) {
  const template = await readFile(join(templateDir, "index.html"), "utf8");
  const site = library.manifest;
  const books = new Map(library.books.map((book) => [book.id, book]));
  const assets = await readdir(join(templateDir, "assets")).catch((error) => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  const reader = assets.find((name) => /^BookReader-.*\.js$/.test(name));
  const libraryLabel = site.locale === "ja" ? "書架" : "Library";
  const urls = [];
  const chapters = new Map();
  for (const page of library.documents) {
    const list = chapters.get(page.book) ?? [];
    list.push(page);
    chapters.set(page.book, list);
  }
  async function write(page, segments, body) {
    const prefix = "../".repeat(segments.length) || "./";
    const route =
      segments.map(encodeURIComponent).join("/") + (segments.length ? "/" : "");
    const head = pageHead(site, page, route, prefix);
    const book = books.get(
      segments[1] ?? (!site.shelf ? site.books[0]?.id : undefined)
    );
    const initial = JSON.stringify({
      library: site,
      book: initialBookMarkup(book, page.chapter, site.locale),
    }).replace(/</g, "\\u003c");
    head.metadata += `
<script type="application/json" id="grimoire-initial">${initial}</script>`;
    if (book) {
      const cover = selectCover(
        book.id,
        book.cover ?? (!site.shelf ? "red" : undefined)
      );
      const resting = assets.find(
        (name) => name.startsWith(`resting-${cover}-`) && name.endsWith(".avif")
      );
      if (resting)
        head.metadata += `
<link rel="preload" as="image" data-first-art fetchpriority="high" media="(min-width: 700px)" href="${prefix}assets/${resting}">`;
      const mobilePaper = assetNamed(assets, prefix, "mobile-paper");
      const smallPaper = assetNamed(assets, prefix, "mobile-paper-sm");
      if (mobilePaper)
        head.metadata += `
<link rel="preload" as="image" data-first-art fetchpriority="high" media="(481px <= width < 700px)" href="${mobilePaper}">`;
      if (smallPaper)
        head.metadata += `
<link rel="preload" as="image" data-first-art fetchpriority="high" media="(max-width: 480px)" href="${smallPaper}">`;
    }
    if (!segments.length && site.shelf) {
      const alcove = assetNamed(assets, prefix, "alcove");
      const cabinet =
        !site.books.some((book) => book.category) &&
        (site.books.length === 3 || site.books.length === 4)
          ? assetNamed(assets, prefix, "mobile-cabinet")
          : alcove;
      if (alcove)
        head.metadata += `
<link rel="preload" as="image" data-first-art fetchpriority="high" media="(min-width: 700px)" href="${alcove}">`;
      const smallCabinet =
        cabinet === alcove
          ? undefined
          : assetNamed(assets, prefix, "mobile-cabinet-sm");
      if (cabinet)
        head.metadata += `
<link rel="preload" as="image" data-first-art fetchpriority="high" media="${smallCabinet ? "(481px <= width < 700px)" : "(max-width: 699px)"}" href="${cabinet}">`;
      if (smallCabinet)
        head.metadata += `
<link rel="preload" as="image" data-first-art fetchpriority="high" media="(max-width: 480px)" href="${smallCabinet}">`;
    }
    const directory = join(destination, ...segments);
    await mkdir(directory, { recursive: true });
    await writeFile(
      join(directory, "index.html"),
      replaceShell(
        template,
        site,
        head,
        prefix,
        body(prefix),
        book ? reader : undefined,
        headMarkup
      )
    );
    if (head.canonical && !page.noindex) urls.push(head.canonical);
  }
  // A single-book site opens the first chapter at the site root as well.
  const firstChapter = chapters.get(site.books[0]?.id)?.[0];
  await write(
    { ...site, noindex: !site.shelf && firstChapter?.noindex },
    [],
    (prefix) => staticShelf(site, prefix, assets, libraryLabel)
  );
  for (const book of site.books) {
    const pages = chapters.get(book.id) ?? [];
    await write(
      {
        title: book.title,
        description: pages[0]?.description,
        noindex: pages[0]?.noindex,
      },
      ["read", book.id],
      (prefix) =>
        `<main class="static-reading"><nav><a href="${prefix}">${libraryLabel}</a></nav><h1>${escapeHtml(book.title)}</h1>${linkList(
          pages.map((page) => ({
            href: prefix + readerPath(book.id, page.chapter),
            title: page.title,
          }))
        )}</main>`
    );
    for (const page of pages) {
      await write(
        page,
        ["read", book.id, ...page.chapter.split("/")],
        (prefix) =>
          staticChapter({
            site,
            book: books.get(book.id),
            page,
            prefix,
            assets,
            libraryLabel,
          })
      );
    }
  }
  if (urls.length) {
    await writeFile(
      join(destination, "sitemap.xml"),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`).join("\n")}\n</urlset>\n`
    );
    if (new URL(site.siteUrl).pathname === "/") {
      await writeFile(
        join(destination, "robots.txt"),
        `User-agent: *\nSitemap: ${new URL("sitemap.xml", site.siteUrl)}\n`
      );
    }
  }
}
