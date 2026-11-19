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
});
