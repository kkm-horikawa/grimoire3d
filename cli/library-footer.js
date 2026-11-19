import { createElement as element } from "react";

export function LibraryFooter({ publisher }) {
  const label = publisher
    ? element(
        publisher.url ? "a" : "span",
        { className: "library-publisher", href: publisher.url },
        publisher.label
      )
    : null;
  return element(
    "footer",
    { className: "library-footer" },
    label,
    element(
      "a",
      { href: "https://github.com/kkm-horikawa/grimoire3d" },
      "Grimoire3D"
    )
  );
}
