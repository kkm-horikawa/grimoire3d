import { Maximize2, Minus, Plus, X } from "lucide-react";
import {
  type JSX,
  type PointerEvent,
  type TouchEvent,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { Copy } from "./types";

export interface DiagramArtwork {
  src: string;
  ratio: number;
}

const maxZoom = 16;

export function DiagramViewer({
  image,
  text,
  onClose,
}: {
  image: DiagramArtwork;
  text: Copy;
  onClose: () => void;
}): JSX.Element {
  const dialog = useRef<HTMLDialogElement>(null);
  const canvas = useRef<HTMLElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const center = useRef({ x: 0.5, y: 0.5 });
  const drag = useRef<{
    pointer: number;
    x: number;
    y: number;
    left: number;
    top: number;
  } | null>(null);

  useLayoutEffect(() => {
    const modal = dialog.current;
    const viewport = canvas.current;
    if (!modal || !viewport) return;
    modal.showModal();
    const measure = (): void => {
      setSize({ width: viewport.clientWidth, height: viewport.clientHeight });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    measure();
    viewport.focus({ preventScroll: true });
    return () => observer.disconnect();
  }, []);

  const width = Math.min(size.width, size.height * image.ratio) * zoom;
  const height = width / image.ratio;
  const surfaceWidth = Math.max(size.width, width);
  const surfaceHeight = Math.max(size.height, height);

  useLayoutEffect(() => {
    const viewport = canvas.current;
    if (!viewport) return;
    viewport.scrollLeft =
      center.current.x * surfaceWidth - viewport.clientWidth / 2;
    viewport.scrollTop =
      center.current.y * surfaceHeight - viewport.clientHeight / 2;
  }, [surfaceHeight, surfaceWidth]);

  function changeZoom(next: number): void {
    const viewport = canvas.current;
    const value = Math.min(maxZoom, Math.max(1, next));
    if (!viewport || value === zoom) return;
    center.current =
      value === 1
        ? { x: 0.5, y: 0.5 }
        : {
            x:
              (viewport.scrollLeft + viewport.clientWidth / 2) /
              Math.max(1, viewport.scrollWidth),
            y:
              (viewport.scrollTop + viewport.clientHeight / 2) /
              Math.max(1, viewport.scrollHeight),
          };
    setZoom(value);
  }

  function grab(event: PointerEvent<HTMLElement>): void {
    const viewport = event.currentTarget;
    if (
      event.pointerType === "touch" ||
      event.button !== 0 ||
      !event.isPrimary ||
      (viewport.scrollWidth <= viewport.clientWidth &&
        viewport.scrollHeight <= viewport.clientHeight)
    )
      return;
    drag.current = {
      pointer: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
    };
    viewport.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function pan(event: PointerEvent<HTMLElement>): void {
    const current = drag.current;
    if (!current || event.pointerId !== current.pointer) return;
    const viewport = event.currentTarget;
    viewport.scrollLeft = current.left + current.x - event.clientX;
    viewport.scrollTop = current.top + current.y - event.clientY;
  }

  function release(event: PointerEvent<HTMLElement>): void {
    if (event.pointerId !== drag.current?.pointer) return;
    drag.current = null;
    setDragging(false);
  }

  function activateTouch(event: TouchEvent<HTMLDivElement>): void {
    if (!(event.target instanceof Element) || event.touches.length) return;
    const button = event.target.closest<HTMLButtonElement>(
      "button:not(:disabled)"
    );
    const finger = event.changedTouches.item(0);
    if (!button || !finger) return;
    const bounds = button.getBoundingClientRect();
    if (
      finger.clientX < bounds.left ||
      finger.clientX > bounds.right ||
      finger.clientY < bounds.top ||
      finger.clientY > bounds.bottom
    )
      return;

    // Some browsers suppress the synthesized click immediately after a scroll.
    event.preventDefault();
    button.click();
  }

  return (
    <dialog
      ref={dialog}
      className="diagram-viewer"
      aria-label={text.diagram}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "+" || event.key === "=") changeZoom(zoom * 1.5);
        else if (event.key === "-") changeZoom(zoom / 1.5);
        else if (event.key === "0") changeZoom(1);
        else return;
        event.preventDefault();
      }}
    >
      <header className="diagram-toolbar">
        <h2>{text.diagram}</h2>
        <div className="diagram-controls" onTouchEnd={activateTouch}>
          <button
            type="button"
            aria-label={text.zoomOut}
            disabled={zoom <= 1}
            onClick={() => changeZoom(zoom / 1.5)}
          >
            <Minus size={19} aria-hidden="true" />
          </button>
          <output aria-live="polite">{Math.round(zoom * 100)}%</output>
          <button
            type="button"
            aria-label={text.zoomIn}
            disabled={zoom >= maxZoom}
            onClick={() => changeZoom(zoom * 1.5)}
          >
            <Plus size={19} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={text.diagramFit}
            onClick={() => changeZoom(1)}
          >
            <Maximize2 size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={text.close}
            onClick={() => dialog.current?.close()}
          >
            <X size={21} aria-hidden="true" />
          </button>
        </div>
      </header>
      <section
        className="diagram-viewport"
        ref={canvas}
        aria-label={text.diagramPan}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: The scrollable diagram is a keyboard pan target.
        tabIndex={0}
        data-pannable={zoom > 1 || undefined}
        data-grabbing={dragging || undefined}
        onPointerDown={grab}
        onPointerMove={pan}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
      >
        <div
          className="diagram-surface"
          style={{ width: surfaceWidth, height: surfaceHeight }}
        >
          <img
            src={image.src}
            alt={text.diagram}
            draggable={false}
            style={{ width, height }}
          />
        </div>
      </section>
    </dialog>
  );
}
