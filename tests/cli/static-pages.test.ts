import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it } from "vitest";
import { readLibrary, readSettings } from "../../cli/content.js";
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
        "author: Editorial team",
        "footer:",
        '  label: "Research & Development"',
        "  url: https://example.com/team/",
      ].join("\n")
    );
    await writeFile(
      join(root, "template/index.html"),
      '<html lang="en"><head><title>Default</title><script type="module" src="./assets/app.js"></script></head><body><div id="root"></div></body></html>'
    );
    await writeFile(
      join(root, "docs/notes/index.md"),
      "---\ncover: teal\n---\n# Notes\n\n[Guide](./guide.md#publish)"
    );
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

    const settings = await readSettings(root);
    const library = await readLibrary(root, settings);
    expect(library.manifest).toMatchObject({
      magicMode: true,
      books: [{ cover: "teal" }],
    });
    await writeStaticPages(join(root, "template"), join(root, "site"), library);
    const shelf = await readFile(join(root, "site/index.html"), "utf8");
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
    const sitemap = await readFile(join(root, "site/sitemap.xml"), "utf8");
    expect(sitemap).toContain(
      "<loc>https://example.com/projects/grimoire/read/notes/guide/</loc>"
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
