import {
  type ComponentProps,
  createContext,
  type JSX,
  lazy,
  Suspense,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { ExtraProps } from "react-markdown";
import type { DiagramArtwork } from "./DiagramViewer";
import type { Copy } from "./types";

const ImageViewer = lazy(() =>
  import("./DiagramViewer").then(({ DiagramViewer }) => ({
    default: DiagramViewer,
  }))
);
const InsideLink = createContext(false);

export function PaperImageLink({
  node: _node,
  children,
  ...props
}: ComponentProps<"a"> & ExtraProps): JSX.Element {
  return (
    <InsideLink.Provider value={true}>
      <a {...props}>{children}</a>
    </InsideLink.Provider>
  );
}

export function PaperImage({
  alt,
  src,
  title,
  text,
}: {
  alt?: string;
  src: string;
  title?: string;
  text: Copy;
}): JSX.Element {
  const linked = useContext(InsideLink);
  const image = useRef<HTMLImageElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [artwork, setArtwork] = useState<DiagramArtwork>();
  const label = title || alt || text.image;
  const imageElement = (
    <img
      ref={image}
      alt={alt ?? ""}
      src={src}
      title={title}
      loading="lazy"
      decoding="async"
    />
  );
  if (linked) return imageElement;

  function open(): void {
    const element = image.current;
    if (!element?.naturalWidth || !element.naturalHeight) return;
    setArtwork({
      src: element.currentSrc || src,
      ratio: element.naturalWidth / element.naturalHeight,
    });
  }

  return (
    <>
      <button
        ref={trigger}
        className="paper-image-open"
        aria-label={text.imageExpand(label)}
        aria-haspopup="dialog"
        type="button"
        onClick={open}
      >
        {imageElement}
      </button>
      {artwork &&
        createPortal(
          <Suspense fallback={null}>
            <ImageViewer
              image={artwork}
              imageLabel={label}
              text={text}
              onClose={() => {
                setArtwork(undefined);
                trigger.current?.focus({ preventScroll: true });
              }}
            />
          </Suspense>,
          document.body
        )}
    </>
  );
}
