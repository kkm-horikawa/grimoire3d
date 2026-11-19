import DOMPurify from "dompurify";
import { Expand } from "lucide-react";
import mermaid from "mermaid";
import { type JSX, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { type DiagramArtwork, DiagramViewer } from "./DiagramViewer";
import type { Copy } from "./types";

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  htmlLabels: false,
  suppressErrorRendering: true,
  secure: [
    "secure",
    "securityLevel",
    "startOnLoad",
    "maxTextSize",
    "maxEdges",
    "suppressErrorRendering",
    "dompurifyConfig",
    "htmlLabels",
    "flowchart",
  ],
  theme: "neutral",
});

const cache = new Map<string, DiagramArtwork | null>();
const rendering = new Map<string, Promise<DiagramArtwork | null>>();
let nextDiagram = 0;

function renderDiagram(code: string): Promise<DiagramArtwork | null> {
  if (cache.has(code)) return Promise.resolve(cache.get(code) ?? null);
  const pending = rendering.get(code);
  if (pending) return pending;

  const result = mermaid
    .render(`grimoire-diagram-${nextDiagram++}`, code)
    .then(({ svg }) => {
      const safe = DOMPurify.sanitize(svg, {
        USE_PROFILES: { svg: true, svgFilters: true },
        FORBID_TAGS: ["a", "foreignObject"],
      });
      const geometry = new DOMParser().parseFromString(
        safe,
        "image/svg+xml"
      ).documentElement;
      const [, , width, height] = (geometry.getAttribute("viewBox") ?? "")
        .trim()
        .split(/\s+/)
        .map(Number);
      const ratio =
        width && height && width > 0 && height > 0 ? width / height : 1;
      return { src: `data:image/svg+xml,${encodeURIComponent(safe)}`, ratio };
    })
    .catch(() => null)
    .then((image) => {
      rendering.delete(code);
      if (cache.size >= 20) {
        const oldest = cache.keys().next().value;
        if (oldest !== undefined) cache.delete(oldest);
      }
      cache.set(code, image);
      return image;
    });
  rendering.set(code, result);
  return result;
}

export default function MermaidDiagram({
  code,
  text,
}: {
  code: string;
  text: Copy;
}): JSX.Element {
  const [result, setResult] = useState<{
    code: string;
    image: DiagramArtwork | null;
  }>();
  const image = result?.code === code ? result.image : cache.get(code);
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (image !== undefined) return;
    let active = true;
    void renderDiagram(code).then((resolved) => {
      if (active) setResult({ code, image: resolved });
    });
    return () => {
      active = false;
    };
  }, [code, image]);

  if (image)
    return (
      <>
        <button
          ref={trigger}
          type="button"
          className="paper-diagram-open"
          aria-label={text.diagramExpand}
          aria-haspopup="dialog"
          onClick={() => setOpen(true)}
        >
          <img className="paper-diagram" src={image.src} alt={text.diagram} />
          <span className="diagram-enlarge">
            <Expand size={14} aria-hidden="true" /> {text.zoomIn}
          </span>
        </button>
        {open &&
          createPortal(
            <DiagramViewer
              image={image}
              text={text}
              onClose={() => {
                setOpen(false);
                trigger.current?.focus({ preventScroll: true });
              }}
            />,
            document.body
          )}
      </>
    );
  return (
    <div className="paper-diagram-source" aria-busy={image === undefined}>
      {image === null && <p>{text.diagramError}</p>}
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
