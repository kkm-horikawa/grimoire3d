import { createElement as element } from "react";

function bindingImage(src, compact, loading) {
  return element(
    "picture",
    null,
    compact &&
      element("source", { media: "(max-width: 699px)", srcSet: compact }),
    element("img", {
      className: "volume-render",
      src,
      width: 600,
      height: 760,
      alt: "",
      loading,
      fetchPriority: "low",
      decoding: "async",
    })
  );
}

export function BookCover({ title, src, compact, artwork, loading, titleRef }) {
  const lettering = element(
    "span",
    { className: "volume-title", ref: titleRef },
    title
  );
  const binding = src && bindingImage(src, compact, loading);
  if (!artwork)
    return element("span", { className: "volume-face" }, binding, lettering);

  return element(
    "span",
    { className: "volume-face" },
    binding,
    src &&
      element(
        "span",
        { className: "volume-unmarked", "aria-hidden": true },
        bindingImage(src, compact, loading)
      ),
    element(
      "span",
      { className: "volume-cover-content" },
      lettering,
      element("img", {
        className: "volume-cover-image",
        src: artwork,
        alt: "",
        loading,
        decoding: "async",
        fetchPriority: "low",
      })
    )
  );
}
