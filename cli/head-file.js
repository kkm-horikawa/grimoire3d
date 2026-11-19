import { readFile, realpath, stat } from "node:fs/promises";
import { isAbsolute, relative, resolve, sep } from "node:path";
import { parse } from "parse5";

const managedMeta = new Set([
  "author",
  "description",
  "grimoire-preview",
  "grimoire-static",
  "og:description",
  "og:image",
  "og:locale",
  "og:site_name",
  "og:title",
  "og:type",
  "og:url",
  "twitter:card",
  "viewport",
]);
const headElements = new Set(["link", "meta", "script", "style"]);
const headStart = "<!doctype html><html><head>\n";

function managedTag(node) {
  const attrs = Object.fromEntries(
    node.attrs.map(({ name, value }) => [name, value])
  );
  if (node.tagName === "title" || node.tagName === "base")
    return `<${node.tagName}>`;
  if (node.tagName === "link") {
    const rel = attrs.rel?.toLowerCase().trim().split(/\s+/) ?? [];
    if (rel.includes("canonical")) return '<link rel="canonical">';
    if (rel.includes("icon")) return '<link rel="icon">';
  }
  if (node.tagName === "meta") {
    if ("charset" in attrs) return "<meta charset>";
    if (attrs["http-equiv"]?.trim().toLowerCase() === "content-type")
      return '<meta http-equiv="content-type">';
    for (const attr of ["name", "property"]) {
      const key = attrs[attr]?.trim().toLowerCase();
      if (managedMeta.has(key)) return `<meta ${attr}="${key}">`;
    }
  }
}

function checkHeadFragment(markup, label) {
  const fileError = (line, message) =>
    new Error(`${label}:${Math.max(1, line - 1)}: ${message}`);
  const document = parse(`${headStart}${markup}</head><body></body></html>`, {
    sourceCodeLocationInfo: true,
    onParseError(error) {
      throw fileError(error.startLine, `Invalid HTML (${error.code}).`);
    },
  });
  const html = document.childNodes.find(({ nodeName }) => nodeName === "html");
  const head = html.childNodes.find(({ nodeName }) => nodeName === "head");
  if (
    head.sourceCodeLocation?.endTag?.startOffset !==
    headStart.length + markup.length
  ) {
    throw new Error(
      `${label}: Expected an HTML head fragment. Use metadata, links, scripts, or styles inside the file.`
    );
  }

  for (const node of head.childNodes) {
    if (
      node.nodeName === "#comment" ||
      (node.nodeName === "#text" && !node.value.trim())
    )
      continue;

    const { startLine } = node.sourceCodeLocation;
    const conflict = node.attrs && managedTag(node);
    if (conflict) {
      throw fileError(
        startLine,
        `${conflict} is managed by Grimoire3D. Use the existing site and chapter settings.`
      );
    }
    if (!headElements.has(node.tagName)) {
      throw fileError(
        startLine,
        "Expected a meta, link, script, or style tag."
      );
    }
  }
}

function insideProject(project, path) {
  const location = relative(project, path);
  return !isAbsolute(location) && location.split(sep)[0] !== "..";
}

export async function readHeadFile(cwd, setting) {
  if (setting === undefined) return "";
  if (
    typeof setting !== "string" ||
    !setting.trim() ||
    isAbsolute(setting) ||
    /^[a-z][a-z\d+.-]*:/i.test(setting)
  ) {
    throw new Error(
      "grimoire.yml: headFile must be a relative path within the project."
    );
  }

  const label = `grimoire.yml: headFile ${JSON.stringify(setting)}`;
  const project = await realpath(cwd);
  const requested = resolve(project, setting);
  const outside = () => new Error(`${label}: Use a path within the project.`);
  if (!insideProject(project, requested)) throw outside();

  const unreadable = (cause) =>
    new Error(
      `${label}: Cannot read the HTML file. Check that it exists and is readable.`,
      { cause }
    );
  const path = await realpath(requested).catch((error) => {
    throw unreadable(error);
  });
  if (!insideProject(project, path)) throw outside();

  let markup;
  try {
    if (!(await stat(path)).isFile()) throw new Error("Expected a file.");
    markup = (await readFile(path, "utf8")).replace(/^\uFEFF/, "");
  } catch (error) {
    throw unreadable(error);
  }

  checkHeadFragment(markup, label);
  return markup;
}
