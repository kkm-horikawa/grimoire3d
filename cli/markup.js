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
