import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { readLibrary, readSettings } from "../../cli/content.js";
import { readLibraryHall, writeHallPages } from "../../cli/hall.js";
import { writeStaticPages } from "../../cli/static-pages.js";

describe("Multi-shelf Library Hall configuration and build", () => {
  let project: string;

  beforeEach(async () => {
    project = await mkdtemp(join(tmpdir(), "grimoire-hall-"));
  });

  afterEach(async () => {
    await rm(project, { recursive: true, force: true });
  });

  async function write(file: string, content: string): Promise<void> {
    const path = join(project, file);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, content);
  }

  it("reads multiple shelves from one grimoire.yml and isolates child libraries", async () => {
    await write(
      "grimoire.yml",
      [
        "locale: en",
        "title: Library Hall",
        "description: Choose a bookshelf to explore",
        "footer:",
        "  label: Back to Home",
        "  url: /",
        "shelves:",
        "  - id: product-docs",
        "    title: Product Docs",
        "    description: Guides, specs, and onboarding",
        "    docsDir: ./docs/product",
        "  - id: architecture",
        "    title: Architecture",
        "    description: System design and runbooks",
        "    docsDir: ./docs/architecture",
        "  - id: external-notes",
        "    title: External Notes",
        "    description: Hosted separately",
        "    href: https://example.com/notes/",
        "    books:",
        "      - title: Release Notes",
        "        cover: plum",
      ].join("\n")
    );
    await write(
      "docs/product/guide/index.md",
      "---\ncover: red\n---\n# Guide\n\nPRODUCT_UNIQUE_TOKEN"
    );
    await write(
      "docs/product/specs/index.md",
      "---\ncover: green\n---\n# Specs"
    );
    await write(
      "docs/product/onboarding/index.md",
      "---\ncover: blue\n---\n# Onboarding"
    );
    await write(
      "docs/product/extra/index.md",
      "---\ncover: amber\n---\n# Fourth Book"
    );
    await write(
      "docs/architecture/design/index.md",
      "---\ncover: amber\n---\n# System Design\n\nARCH_UNIQUE_TOKEN"
    );
    await write(
      "docs/architecture/runbooks/index.md",
      "---\ncover: slate\n---\n# Runbooks"
    );

    const settings = await readSettings(project);
    expect(settings.shelves).toHaveLength(3);
    const hall = await readLibraryHall(project, settings, readLibrary);

    expect(hall.manifest.title).toBe("Library Hall");
    expect(hall.manifest.shelves).toEqual([
      {
        id: "product-docs",
        title: "Product Docs",
        description: "Guides, specs, and onboarding",
        href: "./product-docs/",
        books: [
          { id: "extra", title: "Fourth Book", cover: "amber" },
          { id: "guide", title: "Guide", cover: "red" },
          { id: "onboarding", title: "Onboarding", cover: "blue" },
        ],
      },
      {
        id: "architecture",
        title: "Architecture",
        description: "System design and runbooks",
        href: "./architecture/",
        books: [
          { id: "design", title: "System Design", cover: "amber" },
          { id: "runbooks", title: "Runbooks", cover: "slate" },
        ],
      },
      {
        id: "external-notes",
        title: "External Notes",
        description: "Hosted separately",
        href: "https://example.com/notes/",
        books: [
          { id: "external-notes-1", title: "Release Notes", cover: "plum" },
        ],
      },
    ]);

    expect(hall.children.size).toBe(2);
    const productLib = hall.children.get("product-docs") as {
      manifest: { footer?: { label: string; url?: string } };
      searchBooks: unknown[];
    };
    const archLib = hall.children.get("architecture") as {
      searchBooks: unknown[];
    };
    expect(productLib.manifest.footer).toEqual({
      label: "Back to Library Hall",
      url: "../",
    });
    expect(JSON.stringify(productLib.searchBooks)).toContain(
      "PRODUCT_UNIQUE_TOKEN"
    );
    expect(JSON.stringify(productLib.searchBooks)).not.toContain(
      "ARCH_UNIQUE_TOKEN"
    );
    expect(JSON.stringify(archLib.searchBooks)).toContain("ARCH_UNIQUE_TOKEN");
    expect(JSON.stringify(archLib.searchBooks)).not.toContain(
      "PRODUCT_UNIQUE_TOKEN"
    );
  });

  it("renders static Library Hall HTML and shelves.json including empty state", async () => {
    await write(
      "template/index.html",
      '<html lang="en"><head><meta charset="UTF-8"><title>Default</title></head><body><div id="root"></div></body></html>'
    );
    await writeHallPages(join(project, "template"), join(project, "out"), {
      locale: "en",
      title: "Library Hall",
      description: "Choose a bookshelf to explore",
      footer: { label: "Back to Home", url: "/" },
      shelves: [],
    });
    const html = await readFile(join(project, "out/index.html"), "utf8");
    const json = JSON.parse(
      await readFile(join(project, "out/shelves.json"), "utf8")
    );
    expect(html).toContain('<meta name="grimoire-hall" content="true">');
    expect(html).toContain("No bookshelves are available.");
    expect(html).toContain('href="/"');
    expect(json.shelves).toEqual([]);
  });

  it("rejects invalid shelf definitions fast", async () => {
    await write(
      "grimoire.yml",
      "shelves:\n  - id: read\n    title: Reserved\n    href: ./read/"
    );
    await expect(readSettings(project)).rejects.toThrow("reserved");

    await write(
      "grimoire.yml",
      "shelves:\n  - id: a\n    title: One\n    href: ./a/\n  - id: a\n    title: Two\n    href: ./b/"
    );
    await expect(readSettings(project)).rejects.toThrow("duplicate shelf id");

    await write("grimoire.yml", "shelves:\n  - id: bad\n    title: Missing");
    await expect(readSettings(project)).rejects.toThrow(
      "must specify docsDir or href"
    );

    await write(
      "grimoire.yml",
      'shelves:\n  - id: bad\n    title: Unsafe\n    href: "javascript:alert(1)"'
    );
    await expect(readSettings(project)).rejects.toThrow("href");
  });

  it("inlines Hall CSS, preloads responsive alcove art, and writes isolated child shelves", async () => {
    await write(
      "grimoire.yml",
      [
        "locale: en",
        "title: Library Hall",
        "description: Choose a bookshelf to explore",
        "shelves:",
        "  - id: product-docs",
        "    title: Product Docs",
        "    description: Guides and specs",
        "    docsDir: ./docs/product",
        "  - id: release-notes",
        "    title: Release Notes",
        "    description: Changelogs",
        "    docsDir: ./docs/releases",
      ].join("\n")
    );
    await write(
      "docs/product/guide/index.md",
      "---\ncover: red\n---\n# Guide\n\nSECRET_PRODUCT_TEXT"
    );
    await write(
      "docs/releases/v1/index.md",
      "---\ncover: plum\n---\n# v1.0\n\nSECRET_RELEASE_TEXT"
    );
    await write(
      "template/index.html",
      '<html lang="en"><head><meta charset="UTF-8"><title>Default</title><script type="module" src="./assets/index-app.js"></script></head><body><div id="root"></div></body></html>'
    );
    await write(
      "template/hall.html",
      '<html lang="en"><head><meta charset="UTF-8"><title>Default</title><link rel="modulepreload" href="./assets/jsx-123.js"><link rel="stylesheet" href="./assets/hall-123.css"><script type="module" src="./assets/hall-123.js"></script></head><body><div id="root"></div></body></html>'
    );
    await write(
      "template/assets/hall-123.css",
      '.hall-plaque{border-image:url("./shelf-plate-123.webp") 32 fill/9px stretch}'
    );
    await write("template/assets/hall-alcove-123.webp", "desktop-art");
    await write("template/assets/hall-alcove-mobile-123.webp", "mobile-art");
    await write(
      "template/assets/hall-alcove-mobile-sm-123.webp",
      "mobile-sm-art"
    );
    await write("template/assets/hall-spine-red-123.webp", "spine-art");
    await write("template/assets/cover-red-123.avif", "cover-art");

    const settings = await readSettings(project);
    const hall = await readLibraryHall(project, settings, readLibrary);
    const templateDir = join(project, "template");
    const outDir = join(project, "dist");

    await writeHallPages(templateDir, outDir, hall.manifest);
    for (const [id, child] of hall.children) {
      await writeStaticPages(templateDir, join(outDir, id), child);
    }

    const hallHtml = await readFile(join(outDir, "index.html"), "utf8");
    const shelvesJson = JSON.parse(
      await readFile(join(outDir, "shelves.json"), "utf8")
    );
    const productHtml = await readFile(
      join(outDir, "product-docs/read/guide/index.html"),
      "utf8"
    );
    const releaseHtml = await readFile(
      join(outDir, "release-notes/read/v1/index.html"),
      "utf8"
    );

    expect(hallHtml).toContain("Product Docs");
    expect(hallHtml).toContain("Release Notes");
    expect(hallHtml).toContain('href="./product-docs/"');
    expect(hallHtml).toContain(
      '<style>.hall-plaque{border-image:url("./assets/shelf-plate-123.webp") 32 fill/9px stretch}</style>'
    );
    expect(hallHtml).toContain("data-first-art");
    expect(hallHtml).toContain("hall-alcove-mobile-sm-123.webp");
    expect(hallHtml).not.toContain('rel="stylesheet"');
    expect(hallHtml).not.toContain('rel="modulepreload"');
    expect(hallHtml).not.toContain("SECRET_PRODUCT_TEXT");
    expect(shelvesJson.shelves.map((s: { id: string }) => s.id)).toEqual([
      "product-docs",
      "release-notes",
    ]);
    expect(productHtml).toContain("SECRET_PRODUCT_TEXT");
    expect(productHtml).not.toContain("SECRET_RELEASE_TEXT");
    expect(releaseHtml).toContain("SECRET_RELEASE_TEXT");
    expect(releaseHtml).not.toContain("SECRET_PRODUCT_TEXT");
  });
});
