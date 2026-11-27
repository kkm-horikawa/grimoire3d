import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it } from "vitest";
import { readLibrary, readSettings } from "../../cli/content.js";
import { readHeadFile } from "../../cli/head-file.js";
import { writeStaticPages } from "../../cli/static-pages.js";

it("publishes readable chapter HTML and canonical URLs under a site subpath", async () => {
  const root = await mkdtemp(join(tmpdir(), "grimoire-indexable-"));
  try {
    await mkdir(join(root, "docs/notes"), { recursive: true });
    await mkdir(join(root, "template"));
    await writeFile(
      join(root, "grimoire.yml"),
      [
        "locale: ja",
        "title: Site & Notes",
        "description: Site summary",
        "siteUrl: https://example.com/projects/grimoire",
        "magicMode: true",
        "headFile: head.html",
        "author: Editorial team",
        "footer:",
        '  label: "Research & Development"',
        "  url: https://example.com/team/",
      ].join("\n")
    );
    const verification =
      '<meta name="google-site-verification" content="example">';
    const snippet = '<script>window.dataLayer = [{query: "$&"}];</script>';
    await writeFile(join(root, "head.html"), `${verification}\n${snippet}`);
    await writeFile(
      join(root, "template/index.html"),
      '<html lang="en"><head><meta charset="UTF-8"><title>Default</title><script type="module" src="./assets/app.js"></script></head><body><div id="root"></div></body></html>'
    );
    await writeFile(
      join(root, "docs/notes/index.md"),
      "---\ncover: teal\ncategory: Field work\ncoverImage: ./cover.webp\n---\n# Notes\n\n[Guide](./guide.md#publish)"
    );
    await writeFile(join(root, "docs/notes/cover.webp"), "sample cover");
    await writeFile(
      join(root, "docs/notes/guide.md"),
      [
        "---",
        'title: "A < B"',
        "description: Guide summary",
        "---",
        "# Guide",
        "",
        "An indexable sentence.",
        "",
        "## Publish",
        "",
        ":highlight[Visible markup]",
        "",
        "> [!WARNING]",
        "> Save the original.",
        "",
        "![Example](https://youtu.be/M7lc1UVf-VE)",
      ].join("\n")
    );

    await writeFile(
      join(root, "docs/notes/review.md"),
      "---\nnoindex: true\n---\n# Review notes\n\nReadable by direct link."
    );

    const settings = await readSettings(root);
    const library = await readLibrary(root, settings);
    expect(library.manifest).toMatchObject({
      magicMode: true,
      books: [{ cover: "teal" }],
    });
    await writeStaticPages(
      join(root, "template"),
      join(root, "site"),
      library,
      await readHeadFile(root, settings.headFile)
    );
    const shelf = await readFile(join(root, "site/index.html"), "utf8");
    expect(shelf).not.toContain("data-initial-shelf");
    expect(shelf).toContain('aria-label="Notes"');
    expect(shelf).toContain(
      '<span class="volume-cover-content"><span class="volume-title">Notes</span><img class="volume-cover-image" src="./content/notes/cover.webp"'
    );
    expect(shelf).toContain(
      '<a class="library-publisher" href="https://example.com/team/">Research &amp; Development</a>'
    );
    expect(shelf).toContain(
      '<a href="https://github.com/kkm-horikawa/grimoire3d">Grimoire3D</a>'
    );
    const guide = await readFile(
      join(root, "site/read/notes/guide/index.html"),
      "utf8"
    );
    expect(guide).toContain("<title>A &lt; B · Site &amp; Notes</title>");
    expect(guide).toContain(
      'rel="canonical" href="https://example.com/projects/grimoire/read/notes/guide/"'
    );
    expect(guide).toContain('name="description" content="Guide summary"');
    expect(guide).toContain('import("../../../assets/app.js")');
    expect(guide).toContain("An indexable sentence.");
    expect(guide).toContain('<h2 id="publish">Publish</h2>');
    expect(guide).toContain("<mark>Visible markup</mark>");
    expect(guide).toContain("paper-alert-warning");
    expect(guide).toContain(
      '<a href="https://youtu.be/M7lc1UVf-VE">Example</a>'
    );
    expect(guide).not.toContain("<iframe");
    expect(guide).not.toContain("library-footer");
    const cover = await readFile(
      join(root, "site/read/notes/index.html"),
      "utf8"
    );
    expect(cover).toContain(
      'rel="canonical" href="https://example.com/projects/grimoire/read/notes/"'
    );
    expect(cover).toContain("../../read/notes/guide/#publish");
    expect(cover).toContain(
      '<a class="turn-button" href="../../read/notes/guide/" aria-label="次のページ">'
    );
    expect(guide).toContain(
      '<a class="turn-button" href="../../../read/notes/" aria-label="前のページ">'
    );
    await expect(
      readFile(join(root, "site/read/notes/index/index.html"), "utf8")
    ).rejects.toMatchObject({ code: "ENOENT" });
    for (const html of [shelf, cover, guide]) {
      expect(html.split(verification)).toHaveLength(2);
      expect(html.split(snippet)).toHaveLength(2);
      expect(html.indexOf(verification)).toBeGreaterThan(
        html.indexOf("<meta charset")
      );
      expect(html.indexOf(snippet)).toBeLessThan(html.indexOf("</head>"));
      expect(html.match(/rel="canonical"/g)).toHaveLength(1);
    }
    const sitemap = await readFile(join(root, "site/sitemap.xml"), "utf8");
    expect(sitemap).toContain(
      "<loc>https://example.com/projects/grimoire/read/notes/</loc>"
    );
    expect(sitemap).not.toContain("/read/notes/index/");
    expect(sitemap).toContain(
      "<loc>https://example.com/projects/grimoire/read/notes/guide/</loc>"
    );
    const review = await readFile(
      join(root, "site/read/notes/review/index.html"),
      "utf8"
    );
    expect(review).toContain('<meta name="robots" content="noindex">');
    expect(review).toContain("Readable by direct link.");
    expect(sitemap).not.toContain("/read/notes/review/");
    for (const html of [shelf, cover, guide]) {
      expect(html).not.toContain('<meta name="robots" content="noindex">');
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

it.each([
  ["book directory", "docs/notes", "notes", "https://example.com/", ["/"]],
  ["single book", "docs", "_root", "https://example.com/", []],
  ["single book without a site URL", "docs", "_root", undefined, []],
] as const)(
  "marks entry URLs that open a noindex first chapter in a %s",
  async (_name, docs, id, siteUrl, indexable) => {
    const root = await mkdtemp(join(tmpdir(), "grimoire-noindex-"));
    try {
      await mkdir(join(root, docs), { recursive: true });
      await mkdir(join(root, "template"));
      await writeFile(
        join(root, "template/index.html"),
        '<html lang="en"><head><title>Default</title></head><body><div id="root"></div></body></html>'
      );
      await writeFile(
        join(root, docs, "index.md"),
        "---\nnoindex: true\n---\n# Review notes"
      );
      const library = await readLibrary(root, { locale: "en", siteUrl });
      const output = join(root, "site");
      await writeStaticPages(join(root, "template"), output, library);

      for (const route of ["/", `/read/${id}/`]) {
        const html = await readFile(join(output, route, "index.html"), "utf8");
        expect(html.includes('<meta name="robots" content="noindex">')).toBe(
          !indexable.some((url) => url === route)
        );
      }
      await expect(
        readFile(join(output, `/read/${id}/index/index.html`), "utf8")
      ).rejects.toMatchObject({ code: "ENOENT" });
      if (indexable.length) {
        const sitemap = await readFile(join(output, "sitemap.xml"), "utf8");
        expect(sitemap.match(/<loc>(.*?)<\/loc>/g)).toEqual([
          "<loc>https://example.com/</loc>",
        ]);
      } else {
        await expect(
          readFile(join(output, "sitemap.xml"))
        ).rejects.toMatchObject({
          code: "ENOENT",
        });
        await expect(
          readFile(join(output, "robots.txt"))
        ).rejects.toMatchObject({
          code: "ENOENT",
        });
      }
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  }
);

it("omits the first h2 anchor on static next-page links to a chapter opening", async () => {
  const root = await mkdtemp(join(tmpdir(), "grimoire-turn-anchor-"));
  try {
    await mkdir(join(root, "docs/book"), { recursive: true });
    await mkdir(join(root, "template"));
    await writeFile(
      join(root, "template/index.html"),
      '<html lang="ja"><head><title>Default</title></head><body><div id="root"></div></body></html>'
    );
    await writeFile(
      join(root, "docs/book/index.md"),
      "---\nchapters:\n  - chapter.md\n---\n# Book\n\nCover."
    );
    await writeFile(
      join(root, "docs/book/chapter.md"),
      "# Chapter 1\n\n## First\n\nOpening text.\n\n## Second\n\nSecond page."
    );
    const library = await readLibrary(root, { locale: "ja" });
    await writeStaticPages(join(root, "template"), join(root, "site"), library);
    const cover = await readFile(
      join(root, "site/read/book/index.html"),
      "utf8"
    );
    const chapter = await readFile(
      join(root, "site/read/book/chapter/index.html"),
      "utf8"
    );
    expect(cover).toContain(
      '<a class="turn-button" href="../../read/book/chapter/" aria-label="次のページ">'
    );
    expect(chapter).toContain(
      '<a class="turn-button" href="../../../read/book/" aria-label="前のページ">'
    );
    expect(chapter).toContain(
      '<a class="turn-button" href="../../../read/book/chapter/#second" aria-label="次のページ">'
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

it("keeps nested folder index pages and books without a root index.md working", async () => {
  const root = await mkdtemp(join(tmpdir(), "grimoire-nested-index-"));
  try {
    await mkdir(join(root, "docs/with-nested/part"), { recursive: true });
    await mkdir(join(root, "docs/no-index"), { recursive: true });
    await mkdir(join(root, "template"));
    await writeFile(
      join(root, "template/index.html"),
      '<html lang="en"><head><title>Default</title></head><body><div id="root"></div></body></html>'
    );
    await writeFile(
      join(root, "docs/with-nested/index.md"),
      "# Root Cover\n\nOpening text."
    );
    await writeFile(
      join(root, "docs/with-nested/part/index.md"),
      "# Nested Part\n\nPart intro."
    );
    await writeFile(
      join(root, "docs/no-index/chapter-one.md"),
      "# Chapter One\n\nFirst chapter without root index."
    );
    const library = await readLibrary(root, {
      locale: "en",
      siteUrl: "https://example.com/",
    });
    const out = join(root, "site");
    await writeStaticPages(join(root, "template"), out, library);

    const rootCover = await readFile(
      join(out, "read/with-nested/index.html"),
      "utf8"
    );
    expect(rootCover).toContain("Opening text.");
    await expect(
      readFile(join(out, "read/with-nested/index/index.html"), "utf8")
    ).rejects.toMatchObject({ code: "ENOENT" });

    const nestedIndex = await readFile(
      join(out, "read/with-nested/part/index/index.html"),
      "utf8"
    );
    expect(nestedIndex).toContain("Part intro.");
    expect(nestedIndex).toContain(
      'rel="canonical" href="https://example.com/read/with-nested/part/index/"'
    );

    const noIndexBook = await readFile(
      join(out, "read/no-index/index.html"),
      "utf8"
    );
    expect(noIndexBook).toContain("static-reading");
    const chapterOne = await readFile(
      join(out, "read/no-index/chapter-one/index.html"),
      "utf8"
    );
    expect(chapterOne).toContain("First chapter without root index.");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

it.each([
  ["3 uncategorized books", 3, false, 'class="shelf resting-shelf"'],
  ["5 uncategorized books", 5, false, 'class="shelf resting-shelf"'],
  ["8 uncategorized books", 8, false, 'class="shelf resting-shelf"'],
  ["categorized books", 4, true, 'class="shelf shelf-categorized"'],
] as const)(
  "emits consistent SSR shelf classes matching client hydration for %s",
  async (_label, count, categorized, expectedClassAttr) => {
    const root = await mkdtemp(join(tmpdir(), "grimoire-uniform-shelf-"));
    try {
      await mkdir(join(root, "template"));
      await writeFile(
        join(root, "template/index.html"),
        '<html lang="en"><head><title>Default</title></head><body><div id="root"></div></body></html>'
      );
      for (let i = 1; i <= count; i++) {
        await mkdir(join(root, `docs/book-${i}`), { recursive: true });
        const fm = categorized
          ? `---\ncategory: ${i <= 2 ? "Guides" : "Reference"}\n---\n`
          : "";
        await writeFile(
          join(root, `docs/book-${i}/index.md`),
          `${fm}# Book ${i}\n\nSample page.`
        );
      }
      const library = await readLibrary(root, { locale: "en" });
      await writeStaticPages(
        join(root, "template"),
        join(root, "site"),
        library
      );
      const html = await readFile(join(root, "site/index.html"), "utf8");
      expect(html).toContain(expectedClassAttr);
      expect(html).not.toContain("shelf-many");
      expect(html).not.toContain("data-mobile-rows");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  }
);

it("embeds book appendices in static deep links so subpath URLs resolve to published PDFs", async () => {
  const root = await mkdtemp(join(tmpdir(), "grimoire-appendices-"));
  try {
    await mkdir(join(root, "docs/field-notes/assets"), { recursive: true });
    await mkdir(join(root, "template"));
    await writeFile(
      join(root, "grimoire.yml"),
      "locale: en\nsiteUrl: https://example.com/docs-site/\n"
    );
    await writeFile(
      join(root, "template/index.html"),
      '<html lang="en"><head><meta charset="UTF-8"><title>Default</title></head><body><div id="root"></div></body></html>'
    );
    await writeFile(
      join(root, "docs/field-notes/assets/observation-sheet.pdf"),
      "%PDF-1.4\n"
    );
    await writeFile(
      join(root, "docs/field-notes/index.md"),
      [
        "---",
        "title: Field Notes",
        "appendices:",
        "  - title: Observation worksheet",
        "    file: ./assets/observation-sheet.pdf",
        "---",
        "# Field Notes",
      ].join("\n")
    );
    await writeFile(
      join(root, "docs/field-notes/recording.md"),
      "# Recording Observations\n\nNotes without a direct PDF link."
    );

    const library = await readLibrary(root, await readSettings(root));
    await writeStaticPages(join(root, "template"), join(root, "site"), library);

    const chapterHtml = await readFile(
      join(root, "site/read/field-notes/recording/index.html"),
      "utf8"
    );
    const staticRoot = /<meta name="grimoire-static" content="([^"]+)">/.exec(
      chapterHtml
    )?.[1];
    expect(staticRoot).toBe("../../../");

    const payloadMatch =
      /<script type="application\/json" id="grimoire-initial">([\s\S]*?)<\/script>/.exec(
        chapterHtml
      );
    expect(payloadMatch).not.toBeNull();
    const payload = JSON.parse(payloadMatch?.[1] ?? "{}");
    expect(payload.book.appendices).toEqual([
      {
        title: "Observation worksheet",
        href: "./content/field-notes/assets/observation-sheet.pdf",
      },
    ]);

    const resolved = new URL(
      payload.book.appendices[0].href,
      new URL(
        staticRoot ?? "./",
        "https://example.com/docs-site/read/field-notes/recording/"
      )
    );
    expect(resolved.href).toBe(
      "https://example.com/docs-site/content/field-notes/assets/observation-sheet.pdf"
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
