import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { readLibrary, readSettings } from "../../cli/content.js";

describe("Markdown in a project", () => {
  let project: string;
  beforeEach(async () => {
    project = await mkdtemp(join(tmpdir(), "grimoire-content-"));
  });
  afterEach(async () => {
    await rm(project, { recursive: true, force: true });
  });

  async function write(file: string, content: string): Promise<void> {
    const path = join(project, file);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, content);
  }

  it("opens loose Markdown as one book, with the cover first", async () => {
    await write("docs/10-last.md", "# Last");
    await write("docs/02-next.md", "# Next");
    await write("docs/index.md", "# Project Notes");
    const library = await readLibrary(project, await readSettings(project));
    expect(library.manifest).toMatchObject({
      shelf: false,
      books: [{ title: "Project Notes" }],
    });
    expect(
      library.books[0].pages.map((page: { id: string }) => page.id)
    ).toEqual(["index", "02-next", "10-last"]);
  });

  it("names unconfigured books from README headings without changing chapter order", async () => {
    await write("package.json", '{"name":"project-notes"}');
    await write("docs/00-intro.md", "# Introduction");
    await write("docs/README.md", "## Project documentation");
    await write("docs/handbook/README.md", "# The team handbook");
    await write(
      "docs/handbook/index.md",
      "---\ntitle: Handbook\n---\n# Welcome"
    );
    await write("docs/operations/README.md", "# Operating the service");
    await write("docs/field-notes/a.md", "# Notes");

    const library = await readLibrary(project, { locale: "en" });
    expect(library.manifest.title).toBe("project-notes");
    expect(library.manifest.books.map((book) => book.title)).toEqual([
      "Project documentation",
      "field notes",
      "Handbook",
      "Operating the service",
    ]);
    expect(library.documents.slice(0, 2).map((doc) => doc.chapter)).toEqual([
      "00-intro",
      "README",
    ]);
  });

  it.each([
    ["en", "Overview"],
    ["ja", "概要"],
  ])("uses a localized loose-book title for %s", async (locale, title) => {
    await write("docs/intro.md", "# Introduction");
    const library = await readLibrary(project, { locale });
    expect(library.manifest.books[0].title).toBe(title);
    expect(library.manifest.title).toBe(project.split("/").at(-1));
  });

  it("uses the configured source and lets a command override it", async () => {
    await write("grimoire.yml", "docsDir: handbook\ntitle: Engineering site");
    await write("docs/index.md", "# Default");
    await write("handbook/intro.md", "# Introduction");
    await write("handbook/README.md", "# README title");
    await write("elsewhere/index.md", "# Command line");
    const settings = await readSettings(project);

    const configured = await readLibrary(project, settings);
    expect(configured.manifest.title).toBe("Engineering site");
    expect(configured.manifest.books[0].title).toBe("Engineering site");

    const overridden = await readLibrary(project, settings, "elsewhere");
    expect(overridden.manifest.books[0].title).toBe("Command line");
    await expect(readLibrary(project, settings, "missing")).rejects.toThrow(
      "No Markdown in missing."
    );
  });

  it("keeps nested folders in the parent unless their index makes them separate books", async () => {
    await write(
      "docs/system/index.md",
      "---\ncategory: System\n---\n# System Guide\n\n[Models](data/records.md#fields)"
    );
    await write("docs/system/notes/detail.md", "# Details");
    await write(
      "docs/system/data/index.md",
      "---\nbook: true\ncategory: System\n---\n# Data Models"
    );
    await write(
      "docs/system/data/records.md",
      "# Records\n\n## Fields\n\n[Parent](../index.md)"
    );
    await write("docs/system/data/history/facts.md", "# Facts");
    const library = await readLibrary(project, { locale: "en" });
    expect(library.manifest.books).toMatchObject([
      { id: "system", title: "System Guide", category: "System" },
      { id: "_book-system--data", title: "Data Models", category: "System" },
    ]);
    expect(
      library.documents.map(({ book, chapter }) => [book, chapter])
    ).toEqual([
      ["system", "index"],
      ["system", "notes/detail"],
      ["_book-system--data", "index"],
      ["_book-system--data", "history/facts"],
      ["_book-system--data", "records"],
    ]);
    expect(library.documents[0].links["data/records.md#fields"]).toBe(
      "#/_book-system--data/records?anchor=fields"
    );
    expect(library.documents[4].links["../index.md"]).toBe("#/system/index");
  });

  it("indexes Japanese and English text using the reader's section anchors", async () => {
    await write(
      "docs/guide/index.md",
      "# User Guide\n\nIntroduction to the app.\n\n## Setup\n\nRun **the CLI**.\n\n## 設定\n\nキャッシュを更新するには、設定を開きます。"
    );
    await write("docs/reference/index.md", "# Reference\n\nRate limits.");
    const library = await readLibrary(project, { locale: "en" });
    expect(library.searchBooks).toMatchObject([
      {
        id: "guide",
        sections: [
          {
            chapter: "index",
            title: "User Guide",
            text: "Introduction to the app.",
          },
          { anchor: "setup", heading: "Setup", text: "Run the CLI." },
          {
            anchor: "設定",
            heading: "設定",
            text: "キャッシュを更新するには、設定を開きます。",
          },
        ],
      },
      { id: "reference", sections: [{ text: "Rate limits." }] },
    ]);
    expect(Object.values(library.documents[0].headingIds)).toContain("設定");
  });

  it("orders direct chapters and nested folders without changing routes or separate books", async () => {
    await write(
      "docs/index.md",
      "---\nchapters: [z.md, a.md]\n---\n# Loose pages"
    );
    await write("docs/a.md", "# A");
    await write("docs/z.md", "# Z");
    await write(
      "docs/handbook/index.md",
      "---\nchapters: [setup.md, examples/, overview.md]\n---\n# Handbook"
    );
    await write("docs/handbook/overview.md", "# Overview\n\n[Setup](setup.md)");
    await write("docs/handbook/setup.md", "# Setup\n\n## First\n\n## Second");
    await write("docs/handbook/02-extra.md", "# Extra");
    await write("docs/handbook/10-last.md", "# Last");
    await write(
      "docs/handbook/examples/index.md",
      "---\nchapters: [z.md, a.md]\n---\n# Examples"
    );
    await write("docs/handbook/examples/a.md", "# Example A");
    await write("docs/handbook/examples/z.md", "# Example Z");
    const { books } = await readLibrary(project, { locale: "en" });
    expect(books.map((book: { id: string }) => book.id)).toEqual([
      "_root",
      "handbook",
    ]);
    expect(books[0].pages.map((page: { id: string }) => page.id)).toEqual([
      "index",
      "z",
      "a",
    ]);
    expect(books[1].pages.map((page: { id: string }) => page.id)).toEqual([
      "index",
      "setup",
      "setup",
      "examples/index",
      "examples/z",
      "examples/a",
      "overview",
      "02-extra",
      "10-last",
    ]);
    expect(books[1].pages[3].group).toBe("Examples");
    expect(books[1].pages[6].links["setup.md"]).toBe("#/handbook/setup");
  });

  it.each([
    "null",
    "text",
    "{}",
    "[missing.md]",
    "[a.md, a.md]",
    "[nested, nested/]",
    "[../a.md]",
    "[nested/a.md]",
    "[a.md/]",
    "[assets/]",
    "[7]",
  ])(
    "reports an unusable chapters setting with its index (%s)",
    async (chapters) => {
      await write(
        "docs/book/index.md",
        `---\nchapters: ${chapters}\n---\n# Book`
      );
      await write("docs/book/a.md", "# A");
      await write("docs/book/nested/a.md", "# Nested A");
      await expect(readLibrary(project, { locale: "en" })).rejects.toThrow(
        "book/index.md: chapters"
      );
    }
  );

  it("does not let a loose-book index pull in a separate book", async () => {
    await write(
      "docs/index.md",
      "---\nchapters: [handbook/]\n---\n# Loose pages"
    );
    await write("docs/handbook/index.md", "# Handbook");
    await expect(readLibrary(project, { locale: "en" })).rejects.toThrow(
      "index.md: chapters"
    );
  });

  it("lists category and publication date from the book index in the library", async () => {
    await write(
      "docs/notes/index.md",
      '---\ncategory: " 実験記録 "\ndate: 2024-02-29\n---\n# Notes'
    );
    await write(
      "docs/notes/chapter.md",
      "---\ncategory: Chapter-only\ndate: 2026-11-19\n---\n# Chapter"
    );
    await write("docs/reference/index.md", "# Reference");
    const { manifest } = await readLibrary(
      project,
      await readSettings(project)
    );
    expect(JSON.parse(JSON.stringify(manifest.books))).toEqual([
      { id: "notes", title: "Notes", category: "実験記録", date: "2024-02-29" },
      { id: "reference", title: "Reference" },
    ]);
  });

  it.each(["2026-02-29", "2026-2-09", "2026-11-19T00:00:00Z"])(
    "reports an invalid publication date and its book index (%s)",
    async (date) => {
      await write("docs/notes/index.md", `---\ndate: "${date}"\n---\n# Notes`);
      await expect(readLibrary(project, { locale: "en" })).rejects.toThrow(
        "notes/index.md: date must be a valid publication date in YYYY-MM-DD format."
      );
    }
  );

  it("copies cover photos relative to the book index into the library", async () => {
    await write(
      "docs/notes/index.md",
      '---\ncover: teal\ncoverImage: "./assets/mountain view.webp"\n---\n# Field Notes'
    );
    await write("docs/notes/assets/mountain view.webp", "sample image");
    await write(
      "docs/notes/chapter.md",
      "---\ncoverImage: ignored.png\n---\n# Chapter"
    );
    await write("docs/reference/index.md", "# Reference");
    const result = await readLibrary(project, { locale: "en" });
    expect(JSON.parse(JSON.stringify(result.manifest.books))).toEqual([
      {
        id: "notes",
        title: "Field Notes",
        cover: "teal",
        coverImage: "./content/notes/assets/mountain%20view.webp",
      },
      { id: "reference", title: "Reference" },
    ]);
    expect([...result.assets.keys()]).toEqual([
      "notes/assets/mountain view.webp",
    ]);
  });

  it.each([
    "https://example.com/art.jpg",
    "../../outside.webp",
    "missing.png",
    "art.svg",
  ])(
    "reports an invalid cover image with its book index (%s)",
    async (path) => {
      await write(
        "docs/notes/index.md",
        `---\ncoverImage: "${path}"\n---\n# Notes`
      );
      await expect(readLibrary(project, { locale: "en" })).rejects.toThrow(
        "notes/index.md: coverImage"
      );
    }
  );

  it("accepts a footer label without a link", async () => {
    await write("grimoire.yml", 'footer: {label: " Documentation Team " }');
    await write("docs/handbook/index.md", "# Handbook");
    const { manifest } = await readLibrary(
      project,
      await readSettings(project)
    );
    expect(manifest.footer).toEqual({ label: "Documentation Team" });
  });

  it("reports invalid publisher links and missing labels in site settings", async () => {
    await write(
      "grimoire.yml",
      'footer: {label: Team, url: "ftp://example.com"}'
    );
    await expect(readSettings(project)).rejects.toThrow("footer.url");
    await write("grimoire.yml", 'footer: {url: "https://example.com/"}');
    await expect(readSettings(project)).rejects.toThrow("footer.label");
  });

  it("keeps English routes for Japanese titles and rewrites local AVIF references", async () => {
    await write("grimoire.yml", "locale: ja");
    await write("docs/api-reference/index.md", "# API リファレンス");
    await write("docs/api-reference/assets/diagram.avif", "sample asset");
    await write(
      "docs/api-reference/01-auth.md",
      "# 認証\n\n![構成](./assets/diagram.avif)\n\n[概要](../field-notes/index.md#概要)"
    );
    await write("docs/field-notes/index.md", "# 開発ノート\n\n## 概要");
    const library = await readLibrary(project, await readSettings(project));
    expect(library.manifest).toMatchObject({
      locale: "ja",
      shelf: true,
      books: [
        { id: "api-reference", title: "API リファレンス" },
        { id: "field-notes", title: "開発ノート" },
      ],
    });
    expect(library.books[0].pages[1]).toMatchObject({
      id: "01-auth",
      title: "認証",
      links: {
        "./assets/diagram.avif": "./content/api-reference/assets/diagram.avif",
        "../field-notes/index.md#概要":
          "#/field-notes/index?anchor=%E6%A6%82%E8%A6%81",
      },
    });
    expect([...library.assets.keys()]).toEqual([
      "api-reference/assets/diagram.avif",
    ]);
  });
  it("keeps each Markdown chapter together while starting new H2 pages", async () => {
    await write("docs/release-notes/index.md", "# Release notes");
    await write(
      "docs/release-notes/v1.4.md",
      "# v1.4\n\n## Added\n\n### Animated GIF\n\n[Next](./v1.5.md#migration)\n\n## Fixed"
    );
    await write(
      "docs/release-notes/v1.5.md",
      [
        "# v1.5",
        "An introduction.",
        "## New *features*",
        "See [assets][docs].",
        "```md\n## Example in code\n```",
        "> ## Quoted heading",
        "## New features",
        "## Migration",
        "### Existing links",
        "[docs]: ./assets/demo.avif",
      ].join("\n\n")
    );
    await write("docs/release-notes/assets/demo.avif", "asset");

    const result = await readLibrary(project, { locale: "en" });
    const book = result.books[0];
    expect(result.manifest.books).toEqual([
      { id: "release-notes", title: "Release notes" },
    ]);
    expect(
      book.pages.map((page: { id: string; section?: { id: string } }) => [
        page.id,
        page.section?.id ?? null,
      ])
    ).toEqual([
      ["index", null],
      ["v1.4", "added"],
      ["v1.4", "fixed"],
      ["v1.5", null],
      ["v1.5", "new-features"],
      ["v1.5", "new-features-1"],
      ["v1.5", "migration"],
    ]);
    expect(book.pages[1].markdown).toContain("### Animated GIF");
    expect(book.pages[1].links["./v1.5.md#migration"]).toBe(
      "#/release-notes/v1.5?anchor=migration"
    );
    expect(book.pages[4].markdown).toContain("[docs]: ./assets/demo.avif");
    expect(book.pages[4].links["./assets/demo.avif"]).toBe(
      "./content/release-notes/assets/demo.avif"
    );
    expect(Object.values(book.pages[6].headingIds)).toEqual([
      "migration",
      "existing-links",
    ]);
  });

  it("resolves percent-encoded and local Japanese fragments", async () => {
    await write(
      "docs/index.md",
      "# 本\n\n[移行へ](#%E7%A7%BB%E8%A1%8C)\n\n移行の説明です。\n\n## 移行\n\n### 既存リンク"
    );
    const { books } = await readLibrary(project, { locale: "ja" });
    expect(books[0].pages[0].links["#%E7%A7%BB%E8%A1%8C"]).toBe(
      "#/_root/index?anchor=%E7%A7%BB%E8%A1%8C"
    );
    expect(books[0].pages[1].section?.id).toBe("移行");
  });

  it("bundles book-scoped PDF appendices in declared order even without chapter links", async () => {
    await write(
      "docs/field-notes/index.md",
      [
        "---",
        "title: Field Notes",
        "appendices:",
        "  - title: Observation worksheet",
        '    file: "./assets/observation sheet.pdf"',
        "  - title: Field checklist",
        "    file: ./assets/checklist.pdf",
        "---",
        "# Field Notes",
      ].join("\n")
    );
    await write("docs/field-notes/assets/observation sheet.pdf", "%PDF-1.4\n");
    await write("docs/field-notes/assets/checklist.pdf", "%PDF-1.4\n");
    await write(
      "docs/field-notes/recording.md",
      "---\nappendices:\n  - title: Ignored\n    file: ./assets/checklist.pdf\n---\n# Recording Observations"
    );
    await write(
      "docs/reference/index.md",
      "---\nappendices: []\n---\n# Reference"
    );
    await write("docs/guides/index.md", "---\ntitle: Guides\n---\n# Guides");
    await write(
      "docs/guides/printable/index.md",
      [
        "---",
        "book: true",
        "title: Printable Kit",
        "appendices:",
        "  - title: Quick card",
        "    file: ./assets/card.pdf",
        "---",
        "# Printable Kit",
      ].join("\n")
    );
    await write("docs/guides/printable/assets/card.pdf", "%PDF-1.4\n");

    const result = await readLibrary(project, { locale: "en" });
    const fieldNotes = result.books.find(
      (book: { id: string }) => book.id === "field-notes"
    );
    const reference = result.books.find(
      (book: { id: string }) => book.id === "reference"
    );
    const guides = result.books.find(
      (book: { id: string }) => book.id === "guides"
    );
    const printable = result.books.find(
      (book: { id: string }) => book.id === "_book-guides--printable"
    );

    expect(fieldNotes.appendices).toEqual([
      {
        title: "Observation worksheet",
        href: "./content/field-notes/assets/observation%20sheet.pdf",
      },
      {
        title: "Field checklist",
        href: "./content/field-notes/assets/checklist.pdf",
      },
    ]);
    expect(reference.appendices).toBeUndefined();
    expect(guides.appendices).toBeUndefined();
    expect(printable.appendices).toEqual([
      {
        title: "Quick card",
        href: "./content/guides/printable/assets/card.pdf",
      },
    ]);
    expect([...result.assets.keys()].sort()).toEqual([
      "field-notes/assets/checklist.pdf",
      "field-notes/assets/observation sheet.pdf",
      "guides/printable/assets/card.pdf",
    ]);
  });

  it.each([
    ["non-list value", 'appendices: "./assets/sheet.pdf"', "appendices"],
    [
      "missing title",
      "appendices:\n  - file: ./assets/sheet.pdf",
      "./assets/sheet.pdf",
    ],
    ["missing file", "appendices:\n  - title: Worksheet", "Worksheet"],
    [
      "missing local PDF",
      "appendices:\n  - title: Worksheet\n    file: ./assets/missing.pdf",
      "./assets/missing.pdf",
    ],
    [
      "non-PDF file",
      "appendices:\n  - title: Notes\n    file: ./assets/notes.txt",
      "./assets/notes.txt",
    ],
    [
      "external URL",
      "appendices:\n  - title: External\n    file: https://example.com/sheet.pdf",
      "https://example.com/sheet.pdf",
    ],
    [
      "path outside docs",
      "appendices:\n  - title: Outside\n    file: ../../outside.pdf",
      "../../outside.pdf",
    ],
  ])(
    "reports a diagnostic naming the book and file for %s",
    async (_caseName, frontMatter, expectedDetail) => {
      await write("outside.pdf", "%PDF-1.4\n");
      await write("docs/field-notes/assets/notes.txt", "plain text");
      await write(
        "docs/field-notes/index.md",
        `---\ntitle: Field Notes\n${frontMatter}\n---\n# Field Notes`
      );
      await expect(readLibrary(project, { locale: "en" })).rejects.toThrow(
        "field-notes/index.md (Field Notes)"
      );
      await expect(readLibrary(project, { locale: "en" })).rejects.toThrow(
        expectedDetail
      );
    }
  );
});
