import {
  type ComponentProps,
  isValidElement,
  type JSX,
  lazy,
  Suspense,
  useLayoutEffect,
  useMemo,
} from "react";
import Markdown, { defaultUrlTransform, type ExtraProps } from "react-markdown";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import { remarkGrimoire } from "../../cli/markup.js";
import { videoEmbed } from "../../cli/video-url.js";
import { EmbeddedVideo } from "./EmbedPlayer";
import { resolveHref } from "./navigation";
import { PaperTable } from "./PaperTable";
import type { Copy, Locale, Page } from "./types";

const MermaidDiagram = lazy(() => import("./MermaidDiagram"));

function slug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}\s_-]/gu, "")
    .replace(/\s+/g, "-");
}

function heading(
  Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  ids: Page["headingIds"]
) {
  return ({
    children,
    node,
  }: ComponentProps<"h1"> & ExtraProps): JSX.Element => {
    const offset = node?.position?.start.offset;
    const id = offset === undefined ? undefined : ids?.[offset];
    return (
      <Tag
        id={id ?? (typeof children === "string" ? slug(children) : undefined)}
      >
        {children}
      </Tag>
    );
  };
}

function mediaComponents(text: Copy) {
  return {
    img: ({ alt, src, title }: ComponentProps<"img">): JSX.Element => {
      if (!src) return <span className="missing-image">{alt}</span>;
      const embedded = videoEmbed(src);
      if (embedded) {
        return (
          <EmbeddedVideo
            title={alt || title || embedded.provider}
            original={src}
            video={embedded}
            loadLabel={text.loadVideo}
            openLabel={text.openVideo}
          />
        );
      }
      if (/\.mp4(?:[?#]|$)/i.test(src)) {
        return (
          // biome-ignore lint/a11y/useMediaCaption: The author controls the video's contents and captions.
          <video
            className="paper-video"
            src={src}
            aria-label={alt || title}
            title={title}
            controls
            playsInline
            preload="metadata"
          />
        );
      }
      return (
        <img
          alt={alt ?? ""}
          src={src}
          title={title}
          loading="lazy"
          decoding="async"
        />
      );
    },
    pre: ({ children }: ComponentProps<"pre">): JSX.Element => {
      if (
        isValidElement<ComponentProps<"code">>(children) &&
        children.props.className === "language-mermaid" &&
        typeof children.props.children === "string"
      ) {
        return (
          <Suspense fallback={<pre aria-busy="true">{children}</pre>}>
            <MermaidDiagram code={children.props.children} text={text} />
          </Suspense>
        );
      }
      return <pre>{children}</pre>;
    },
  };
}

function pageUrl(page: Page, url: string): string | undefined {
  if (Object.hasOwn(page.links, url)) {
    const target = page.links[url];
    return target ? resolveHref(target) : undefined;
  }
  try {
    const decoded = decodeURI(url);
    if (Object.hasOwn(page.links, decoded))
      return page.links[decoded] || undefined;
  } catch {
    return defaultUrlTransform(url);
  }
  return defaultUrlTransform(url);
}

export default function PageMarkdown({
  page,
  text,
  locale,
  onReady,
}: {
  page: Page;
  text: Copy;
  locale: Locale;
  onReady: () => void;
}): JSX.Element {
  useLayoutEffect(() => onReady(), [onReady]);
  const headingIds = page.headingIds;
  const components = useMemo(
    () => ({
      ...mediaComponents(text),
      table: ({ children }: ComponentProps<"table">) => (
        <PaperTable label={text.scrollableTable}>{children}</PaperTable>
      ),
      h1: heading("h1", headingIds),
      h2: heading("h2", headingIds),
      h3: heading("h3", headingIds),
      h4: heading("h4", headingIds),
      h5: heading("h5", headingIds),
      h6: heading("h6", headingIds),
    }),
    [headingIds, text]
  );
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkDirective, [remarkGrimoire, locale]]}
      components={components}
      urlTransform={(url) => pageUrl(page, url)}
    >
      {page.markdown}
    </Markdown>
  );
}
