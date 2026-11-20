import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import { toText } from "hast-util-to-text";
import { renderToString } from "katex";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import {
  defListHastHandlers,
  remarkDefinitionList,
} from "remark-definition-list";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

/** Shared parser extensions for chapter splitting, static HTML, and the reader. */
export function remarkPlugins(locale = "en") {
  return [
    remarkGfm,
    remarkDirective,
    remarkMath,
    remarkDefinitionList,
    [remarkGrimoire, locale],
  ];
}

export function markdownOptions(locale = "en") {
  return {
    handlers: defListHastHandlers,
    footnoteLabel: locale === "ja" ? "脚注" : "Footnotes",
    footnoteBackLabel: locale === "ja" ? "本文へ戻る" : "Back to content",
  };
}

function scopedFootnotes(scope) {
  function visit(node, footnotes = false) {
    if (node.type === "element") {
      const properties = node.properties;
      footnotes ||= Object.hasOwn(properties, "dataFootnotes");
      const reference = Object.hasOwn(properties, "dataFootnoteRef");
      const back = Object.hasOwn(properties, "dataFootnoteBackref");
      if ((footnotes || reference) && properties.id) {
        properties.id = `${scope}-${properties.id}`;
        if (footnotes) properties.tabIndex = -1;
      }
      if ((reference || back) && properties.href?.startsWith("#"))
        properties.href = `#${encodeURIComponent(`user-content-${scope}-${properties.href.slice(1)}`)}`;
      if (reference && properties.ariaDescribedBy)
        properties.ariaDescribedBy = properties.ariaDescribedBy.map(
          (id) => `${scope}-${id}`
        );
    }
    node.children?.forEach((child) => {
      visit(child, footnotes);
    });
  }
  return (tree) => visit(tree);
}

// Sanitize author HTML before trusted renderers add their generated markup.
const schema = {
  ...defaultSchema,
  tagNames: [...defaultSchema.tagNames, "mark", "u"],
  attributes: {
    ...defaultSchema.attributes,
    blockquote: [
      ...defaultSchema.attributes.blockquote,
      [
        "className",
        "paper-alert",
        /^paper-alert-(?:note|tip|important|warning|caution)$/,
      ],
    ],
    p: [["className", "paper-alert-label"]],
    span: [["className", "paper-red"]],
    code: [["className", /^language-./, "math-inline", "math-display"]],
    details: ["open"],
  },
};

// Use the directly declared KaTeX version for both HTML and its stylesheet.
function renderMath() {
  function visit(parent) {
    parent.children?.forEach((node, index) => {
      const code = node.tagName === "pre" ? node.children?.[0] : node;
      const classes = code?.properties?.className ?? [];
      const display =
        classes.includes("math-display") ||
        (classes.includes("language-math") && !classes.includes("math-inline"));
      if (
        code?.tagName === "code" &&
        (display || classes.includes("math-inline"))
      ) {
        const html = renderToString(toText(code), {
          displayMode: display,
          throwOnError: false,
          strict: "ignore",
          trust: false,
        });
        parent.children.splice(
          index,
          1,
          ...fromHtmlIsomorphic(html, { fragment: true }).children
        );
      } else {
        visit(node);
      }
    });
  }
  return visit;
}

export function rehypePlugins(page) {
  const scope = `grimoire-${encodeURIComponent(page.id ?? page.chapter ?? "index")}-${encodeURIComponent(page.section?.id ?? "chapter")}`;
  return [
    rehypeRaw,
    [scopedFootnotes, scope],
    [rehypeSanitize, schema],
    renderMath,
    [rehypeHighlight, { detect: false, plainText: ["mermaid"] }],
  ];
}

const inline = {
  underline: "u",
  highlight: "mark",
  red: "span",
};
const alertNames = {
  en: {
    NOTE: "Note",
    TIP: "Tip",
    IMPORTANT: "Important",
    WARNING: "Warning",
    CAUTION: "Caution",
  },
  ja: {
    NOTE: "注記",
    TIP: "ヒント",
    IMPORTANT: "重要",
    WARNING: "警告",
    CAUTION: "注意",
  },
};

/** @param {"en" | "ja"} [locale] */
export function remarkGrimoire(locale = "en") {
  /** @param {any} node */
  function visit(node) {
    if (node.type === "textDirective" && Object.hasOwn(inline, node.name)) {
      node.data = { hName: inline[node.name] };
      if (node.name === "red")
        node.data.hProperties = { className: ["paper-red"] };
    }
    if (node.type === "blockquote") {
      const paragraph = node.children[0];
      const first = paragraph?.type === "paragraph" && paragraph.children[0];
      const marker =
        first?.type === "text" &&
        /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\r?\n|$)/.exec(
          first.value
        );
      if (marker) {
        const name = marker[1];
        first.value = first.value.slice(marker[0].length);
        if (!first.value) paragraph.children.shift();
        if (!paragraph.children.length) node.children.shift();
        node.children.unshift({
          type: "paragraph",
          data: { hProperties: { className: ["paper-alert-label"] } },
          children: [{ type: "text", value: alertNames[locale][name] }],
        });
        node.data = {
          hProperties: {
            className: ["paper-alert", `paper-alert-${name.toLowerCase()}`],
          },
        };
      }
    }
    node.children?.forEach(visit);
  }
  return visit;
}
