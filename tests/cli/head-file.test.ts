import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { readHeadFile } from "../../cli/head-file.js";

describe("a project's optional head file", () => {
  let temp: string;
  let project: string;

  beforeEach(async () => {
    temp = await mkdtemp(join(tmpdir(), "grimoire-head-"));
    project = join(temp, "project");
    await mkdir(project);
  });

  afterEach(async () => {
    await rm(temp, { recursive: true, force: true });
  });

  it("uses only the file named in the configuration", async () => {
    await writeFile(join(project, "head.html"), "<title>Ignored</title>");
    await expect(readHeadFile(project, undefined)).resolves.toBe("");

    const markup = [
      "<!-- <title>Documentation example</title> -->",
      '<script>window.markup = "<title>literal</title>";</script>',
      '<meta name="google-site-verification" content="example">',
      '<meta name="robots" content="nofollow">',
    ].join("\n");
    await mkdir(join(project, "settings"));
    await writeFile(join(project, "settings/tags.html"), markup);
    await expect(readHeadFile(project, "settings/tags.html")).resolves.toBe(
      markup
    );
  });

  it.each([
    ['<link href="/" REL="Canon&#105;cal">', '<link rel="canonical">'],
    ["<title>Library</title>", "<title>"],
    ["<Meta CONTENT=Website NAME=DESCRIPTION>", '<meta name="description">'],
    [
      '<meta property="OG:TITLE" content="Library">',
      '<meta property="og:title">',
    ],
    [
      '<meta name="twitter:card" content="summary">',
      '<meta name="twitter:card">',
    ],
    ['<base href="/other/">', "<base>"],
  ])("reports the source of managed markup (%s)", async (tag, identifier) => {
    await writeFile(join(project, "head.html"), `<!-- line one -->\n${tag}`);
    await expect(readHeadFile(project, "head.html")).rejects.toThrow(
      `headFile "head.html":2: ${identifier} is managed`
    );
  });

  it.each([
    "<body>Content</body>",
    '<script src="portal.js">',
    "</head><meta name=robots content=noindex>",
  ])("rejects markup that cannot stay in the head (%s)", async (markup) => {
    await writeFile(join(project, "head.html"), markup);
    await expect(readHeadFile(project, "head.html")).rejects.toThrow(
      "head.html"
    );
  });

  it("reports missing files, directories, and paths outside the project", async () => {
    const external = join(temp, "external.html");
    await writeFile(external, "<script>external()</script>");
    await symlink(external, join(project, "linked.html"));
    await mkdir(join(project, "config"));

    await expect(readHeadFile(project, "missing.html")).rejects.toThrow(
      'headFile "missing.html": Cannot read'
    );
    await expect(readHeadFile(project, "config")).rejects.toThrow(
      "Cannot read"
    );
    await expect(readHeadFile(project, "linked.html")).rejects.toThrow(
      "within the project"
    );
    await expect(readHeadFile(project, "../external.html")).rejects.toThrow(
      "within the project"
    );
    await expect(readHeadFile(project, external)).rejects.toThrow(
      "relative path"
    );
    await expect(
      readHeadFile(project, "https://example.com/head.html")
    ).rejects.toThrow("relative path");
  });
});
