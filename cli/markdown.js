import { fromMarkdown } from "mdast-util-from-markdown";
import { gfmFromMarkdown } from "mdast-util-gfm";
import { gfm } from "micromark-extension-gfm";
import { parse } from "yaml";

function textOf(node) {
  if (node.type === "image") return node.alt ?? "";
  return node.value ?? node.children?.map(textOf).join("") ?? "";
}

function headingSlug(title) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^\p{Letter}\p{Number}\s_-]/gu, "")
      .replace(/\s+/g, "-") || "section"
  );
}

function isDefinition(node) {
  return node.type === "definition" || node.type === "footnoteDefinition";
}

export function readMarkdown(source) {
  const front = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);
  let raw;
  if (front) {
    try {
      raw = parse(front[1]);
    } catch {
      raw = undefined;
    }
  }
  const metadata =
    raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const markdown = raw === metadata ? source.slice(front[0].length) : source;
  const tree = fromMarkdown(markdown, {
    extensions: [gfm()],
    mdastExtensions: [gfmFromMarkdown()],
  });
  const headings = new Map();
  const anchors = new Set();
  const urls = new Set();
  function visit(node) {
    if (node.type === "heading") {
      const title = textOf(node).trim();
      const slug = headingSlug(title);
      let id = slug;
      for (let suffix = 1; anchors.has(id); suffix += 1) {
        id = `${slug}-${suffix}`;
      }
      anchors.add(id);
      headings.set(node, { id, title });
    }
    if (["link", "image", "definition"].includes(node.type)) urls.add(node.url);
    node.children?.forEach(visit);
  }
  visit(tree);

  const heading = tree.children.find(
    (node) => node.type === "heading" && node.depth === 1
  );
  const boundaries = [{ start: 0 }];
  let hasChapterContent = false;
  for (const node of tree.children) {
    if (node.type === "heading" && node.depth === 2) {
      const section = headings.get(node);
      if (hasChapterContent) {
        boundaries.push({ start: node.position.start.offset, section });
      } else {
        // The chapter already starts on a fresh page, so its title can share that page.
        boundaries[0].section = section;
      }
    }
    if (node !== heading && !isDefinition(node)) hasChapterContent = true;
  }

  const definitions = tree.children.filter(isDefinition);
  const headingOffsets = [...headings].map(([node, { id }]) => ({
    offset: node.position.start.offset,
    id,
  }));
  let nextHeading = 0;
  const sheets = boundaries.map(({ start, section }, index) => {
    const end = boundaries[index + 1]?.start ?? markdown.length;
    const headingIds = {};
    while (headingOffsets[nextHeading]?.offset < end) {
      const { offset, id } = headingOffsets[nextHeading];
      headingIds[offset - start] = id;
      nextHeading += 1;
    }
    const references = definitions
      .filter(
        ({ position }) =>
          position.start.offset < start || position.start.offset >= end
      )
      .map(({ position }) =>
        markdown.slice(position.start.offset, position.end.offset)
      );
    const content = markdown.slice(start, end);
    return {
      markdown: references.length
        ? [content, ...references].join("\n\n")
        : content,
      headingIds,
      section,
    };
  });

  const paragraph = tree.children.find((node) => node.type === "paragraph");
  const excerpt = paragraph
    ? textOf(paragraph).replace(/\s+/g, " ").trim()
    : "";
  return {
    heading: headings.get(heading)?.title,
    metadata: {
      cover:
        typeof metadata.cover === "string" ? metadata.cover.trim() : undefined,
      title:
        typeof metadata.title === "string" ? metadata.title.trim() : undefined,
      description:
        typeof metadata.description === "string"
          ? metadata.description.trim()
          : undefined,
      socialImage:
        typeof metadata.socialImage === "string"
          ? metadata.socialImage.trim()
          : undefined,
      category:
        typeof metadata.category === "string"
          ? metadata.category.trim() || undefined
          : undefined,
      date: metadata.date,
      chapters: metadata.chapters,
      noindex: metadata.noindex === true,
      coverImage:
        typeof metadata.coverImage === "string"
          ? metadata.coverImage.trim() || undefined
          : undefined,
    },
    excerpt: [...excerpt].slice(0, 170).join(""),
    markdown,
    headingIds: Object.fromEntries(
      headingOffsets.map(({ offset, id }) => [offset, id])
    ),
    sheets,
    urls: [...urls],
  };
}
