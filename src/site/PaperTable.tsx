import {
  type JSX,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export function PaperTable({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}): JSX.Element {
  const viewport = useRef<HTMLDivElement>(null);
  const table = useRef<HTMLTableElement>(null);
  const [overflow, setOverflow] = useState(false);

  useLayoutEffect(() => {
    const scroller = viewport.current;
    const grid = table.current;
    if (!scroller || !grid) return;
    const measure = (): void => {
      setOverflow(scroller.scrollWidth > scroller.clientWidth);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    observer.observe(grid);
    measure();
    return () => observer.disconnect();
  }, []);

  const scrollProps = overflow
    ? ({ role: "region", "aria-label": label, tabIndex: 0 } as const)
    : undefined;
  return (
    <div
      ref={viewport}
      className="paper-table"
      data-overflow={overflow || undefined}
      {...scrollProps}
    >
      <table ref={table}>{children}</table>
    </div>
  );
}
