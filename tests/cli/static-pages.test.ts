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
      join(root, "site/read/notes/index/index.html"),
      "utf8"
    );
    expect(cover).toContain("../../../read/notes/guide/#publish");
    expect(cover).toContain(
      '<a class="turn-button" href="../../../read/notes/guide/" aria-label="次のページ">'
    );
    const book = await readFile(
      join(root, "site/read/notes/index.html"),
      "utf8"
    );
    for (const html of [shelf, book, cover, guide]) {
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
      "<loc>https://example.com/projects/grimoire/read/notes/guide/</loc>"
    );
    const review = await readFile(
      join(root, "site/read/notes/review/index.html"),
      "utf8"
    );
    expect(review).toContain('<meta name="robots" content="noindex">');
    expect(review).toContain("Readable by direct link.");
    expect(sitemap).not.toContain("/read/notes/review/");
    for (const html of [shelf, book, cover, guide]) {
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

      for (const route of ["/", `/read/${id}/`, `/read/${id}/index/`]) {
        const html = await readFile(join(output, route, "index.html"), "utf8");
        expect(html.includes('<meta name="robots" content="noindex">')).toBe(
          !indexable.some((url) => url === route)
        );
      }
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
      join(root, "site/read/book/index/index.html"),
      "utf8"
    );
    const chapter = await readFile(
      join(root, "site/read/book/chapter/index.html"),
      "utf8"
    );
    expect(cover).toContain(
      '<a class="turn-button" href="../../../read/book/chapter/" aria-label="次のページ">'
    );
    expect(chapter).toContain(
      '<a class="turn-button" href="../../../read/book/chapter/#second" aria-label="次のページ">'
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
