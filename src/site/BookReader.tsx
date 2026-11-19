import {
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  List,
  Sparkles,
  X,
} from "lucide-react";
import {
  type CSSProperties,
  type JSX,
  lazy,
  type MouseEvent,
  type PointerEvent,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { coverFor, restingImage } from "./covers";
import { bookHref, initialPaper, navigate, shelfHref } from "./navigation";
import { captureInk } from "./pageInk";
import {
  type PreparedTurn,
  planPageTurn,
  spreadStart,
  turnFaces,
} from "./pageTurn";
import { readFrame } from "./projection";
import { playSpellInk } from "./spellInk";
import {
  type Book,
  type Copy,
  chapterPageIndex,
  type Library,
  type Locale,
  type Page,
  pageKey,
  type Section,
} from "./types";

const BookScene = lazy(() => import("./BookScene"));
const loadPageMarkdown = () => import("./PageMarkdown");
const PageMarkdown = lazy(loadPageMarkdown);
const wideQuery = "(min-width: 700px)";
const reducedQuery = "(prefers-reduced-motion: reduce)";

function useMedia(query: string): boolean {
  const [enabled, setEnabled] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const media = matchMedia(query);
    const onChange = (): void => setEnabled(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);
  return enabled;
}

function Sheet({
  page,
  number,
  side,
  anchor,
  bookTitle,
  text,
  locale,
}: {
  page: Page | undefined;
  number: number;
  side: "left" | "right";
  anchor: string | null;
  bookTitle: string;
  text: Copy;
  locale: Locale;
}): JSX.Element {
  const article = useRef<HTMLElement>(null);
  const scrollToAnchor = useCallback(() => {
    if (!article.current) return;
    article.current.scrollTop = 0;
    if (!anchor) return;
    const target = Array.from(
      article.current.querySelectorAll<HTMLElement>("[id]")
    ).find((element) => element.id === anchor);
    if (target) {
      // Scroll the paper without shifting the surrounding book.
      article.current.scrollTop =
        target.getBoundingClientRect().top -
        article.current.getBoundingClientRect().top;
    }
  }, [anchor]);
  useLayoutEffect(() => scrollToAnchor(), [scrollToAnchor]);
  const contentReady = useCallback(() => {
    scrollToAnchor();
    article.current?.dispatchEvent(
      new Event("grimoire-content", { bubbles: true })
    );
  }, [scrollToAnchor]);

  return (
    <div
      className={`book-sheet book-sheet--${side}`}
      data-sheet={side}
      data-page-id={page?.id}
      data-page-key={page && pageKey(page)}
      data-section-id={page?.section?.id}
    >
      {page && (
        <>
          {page.preparedHtml !== undefined ? (
            <article
              ref={article}
              aria-label={page.section?.title || page.title}
              className="page-text"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: The static builder renders Markdown to escaped HTML with raw HTML disabled.
              dangerouslySetInnerHTML={{ __html: page.preparedHtml }}
            />
          ) : (
            <article
              ref={article}
              aria-label={page.section?.title || page.title}
              className="page-text"
            >
              {side === "left" && page.group && (
                <p className="page-running-head">{bookTitle}</p>
              )}
              <Suspense
                fallback={
                  <p data-markdown-loading aria-busy="true">
                    {text.loading}
                  </p>
                }
              >
                <PageMarkdown
                  page={page}
                  text={text}
                  locale={locale}
                  onReady={contentReady}
                />
              </Suspense>
            </article>
          )}
          <span aria-hidden="true" className="folio-number">
            {number}
          </span>
        </>
      )}
    </div>
  );
}

interface CatalogEntry {
  id: string;
  label: string;
  first: number;
  sections: { section: Section; position: number }[];
}

function catalogEntries(pages: Page[], cover: string): CatalogEntry[] {
  const entries: CatalogEntry[] = [];
  for (const [position, page] of pages.entries()) {
    let entry = entries.at(-1);
    if (entry?.id !== page.id) {
      entry = {
        id: page.id,
        label: position === 0 && page.id === "index" ? cover : page.title,
        first: position,
        sections: [],
      };
      entries.push(entry);
    }
    if (page.section) entry.sections.push({ section: page.section, position });
  }
  return entries;
}

interface ReaderProps {
  library: Library;
  text: Copy;
  book: Book;
  pageId: string | undefined;
  anchor: string | null;
  onPaperReady?: (paper: HTMLElement) => void;
  onReturn?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function BookReader({
  library,
  text,
  book,
  pageId,
  anchor,
  onPaperReady,
  onReturn,
}: ReaderProps): JSX.Element {
  const [ready, setReady] = useState(false);
  const [sceneRequested, setSceneRequested] = useState(false);
  const [scenePresented, setScenePresented] = useState(false);
  const [anticipated, setAnticipated] = useState<number>();
  const inkCache = useRef(new Map<string, HTMLCanvasElement>());
  const [sceneFailed, setSceneFailed] = useState(false);
  const [opened, setOpened] = useState(false);
  const [magic, setMagic] = useState(library.magicMode ?? false);
  const swipe = useRef<{ id: number; x: number; y: number } | undefined>(
    undefined
  );
  const [collapsed, setCollapsed] = useState(() => new Set<string>());
  const catalog = useRef<HTMLDialogElement>(null);
  const contentsButton = useRef<HTMLButtonElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const paper = useRef<HTMLDivElement>(null);
  const initialPaperSlot = useRef<HTMLDivElement>(null);
  const keptPaper =
    initialPaper?.dataset.initialBook === book.id ? initialPaper : null;
  const wide = useMedia(wideQuery);
  const reducedMotion = useMedia(reducedQuery);
  const fittedRead = wide && !opened;
  const openedFromShelf = useRef(Boolean(onPaperReady));
  useEffect(() => {
    if (!onPaperReady && openedFromShelf.current && wide && !reducedMotion) {
      openedFromShelf.current = false;
      setSceneRequested(true);
    }
  }, [onPaperReady, reducedMotion, wide]);
  useEffect(() => {
    if (!wide) setReady(false);
  }, [wide]);
  const { pages } = book;
  const { binding, style } = coverFor(
    book.id,
    book.cover ?? (library.shelf ? undefined : "red")
  );
  const entries = useMemo(
    () => (opened ? catalogEntries(pages, text.cover) : []),
    [opened, pages, text.cover]
  );
  const requestedIndex = chapterPageIndex(pages, pageId, anchor);
  const [settledIndex, setSettledIndex] = useState(requestedIndex);
  const [preparedTurn, setPreparedTurn] = useState<PreparedTurn | null>(null);
  const turnCapture = useRef<HTMLDivElement>(null);
  const turnPlan = useMemo(
    () =>
      wide && !sceneFailed && !reducedMotion
        ? planPageTurn(settledIndex, requestedIndex)
        : null,
    [sceneFailed, reducedMotion, requestedIndex, settledIndex, wide]
  );
  const captureTarget = turnPlan ? requestedIndex : anticipated;
  const capturePlan = useMemo(
    () =>
      captureTarget === undefined || !wide || sceneFailed || reducedMotion
        ? null
        : planPageTurn(settledIndex, captureTarget),
    [captureTarget, reducedMotion, sceneFailed, settledIndex, wide]
  );
  const turn =
    ready && turnPlan && preparedTurn?.plan === capturePlan
      ? preparedTurn
      : null;
  const needsScene = wide && !reducedMotion && (sceneRequested || !!turnPlan);
  const showScene = ready && (!!turn || scenePresented);
  useEffect(() => {
    if (turnPlan) setSceneRequested(true);
  }, [turnPlan]);
  const sceneReady = useCallback((available: boolean): void => {
    setReady(available);
    setSceneFailed(!available);
  }, []);
  const index = turnPlan ? settledIndex : requestedIndex;
  const start = spreadStart(index, wide);
  const activeAnchor = index === requestedIndex ? anchor : null;

  const lastSpell = useRef<number | undefined>(undefined);
  useLayoutEffect(() => {
    if (!magic) {
      lastSpell.current = undefined;
      return;
    }
    const host = stage.current;
    if (
      !host ||
      reducedMotion ||
      onPaperReady ||
      opened ||
      turnPlan ||
      lastSpell.current === start
    )
      return;
    let cleanup: (() => void) | undefined;
    let frame = 0;
    let waiting = false;
    let disposed = false;
    const schedule = (): void => {
      if (disposed || frame || waiting || lastSpell.current === start) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (host.querySelector(":scope > .book-sheet [data-markdown-loading]"))
          return;
        const arrival = [...host.querySelectorAll(":scope > .book-sheet")]
          .flatMap((sheet) => sheet.getAnimations())
          .filter(
            (animation) =>
              animation.pending || animation.playState === "running"
          );
        if (arrival.length) {
          // A phone's entering sheet is still transformed. Measure ink in its resting coordinates.
          waiting = true;
          void Promise.allSettled(
            arrival.map((animation) => animation.finished)
          ).then(() => {
            waiting = false;
            schedule();
          });
          return;
        }
        lastSpell.current = start;
        cleanup = playSpellInk(host);
      });
    };
    host.addEventListener("grimoire-content", schedule);
    schedule();
    return () => {
      disposed = true;
      host.removeEventListener("grimoire-content", schedule);
      cancelAnimationFrame(frame);
      cleanup?.();
    };
  }, [magic, opened, onPaperReady, reducedMotion, start, turnPlan]);

  const finishTurn = useCallback(
    (finished: PreparedTurn): void => {
      setScenePresented(true);
      setSettledIndex(finished.plan.to);
      setPreparedTurn(null);
      const ahead =
        spreadStart(finished.plan.to, true) + finished.plan.direction * 2;
      setAnticipated(ahead >= 0 && ahead < pages.length ? ahead : undefined);
    },
    [pages.length]
  );

  function anticipateTurn(target: number): void {
    if (!wide || reducedMotion || sceneFailed || turnPlan || !pages[target])
      return;
    setSceneRequested(true);
    setAnticipated(target);
    if (pages[target]?.preparedHtml === undefined) void loadPageMarkdown();
  }

  useEffect(() => {
    const resized = (): void => {
      inkCache.current.clear();
      setAnticipated(undefined);
    };
    window.addEventListener("resize", resized);
    return () => window.removeEventListener("resize", resized);
  }, []);

  useLayoutEffect(() => {
    if (!turn) return;
    for (const video of stage.current?.querySelectorAll<HTMLVideoElement>(
      ":scope > .book-sheet video"
    ) ?? []) {
      video.pause();
    }
  }, [turn]);

  useLayoutEffect(() => {
    const host = stage.current;
    if (!host || !fittedRead) return;
    const layout = (): void => {
      const frame = readFrame(host.clientWidth, host.clientHeight);
      host.style.setProperty("--read-paper-width", `${frame.width}px`);
      host.style.setProperty("--read-paper-height", `${frame.height}px`);
    };
    const observer = new ResizeObserver(layout);
    layout();
    observer.observe(host);
    return () => {
      observer.disconnect();
      host.style.removeProperty("--read-paper-width");
      host.style.removeProperty("--read-paper-height");
    };
  }, [fittedRead]);

  useLayoutEffect(() => {
    const target = initialPaperSlot.current;
    if (!(keptPaper instanceof HTMLDivElement) || !target) return;
    target.append(keptPaper);
    paper.current = keptPaper;
    return () => {
      keptPaper.remove();
      paper.current = null;
    };
  }, [keptPaper]);

  useLayoutEffect(() => {
    if (onPaperReady && paper.current) onPaperReady(paper.current);
  }, [onPaperReady]);

  useEffect(() => {
    if (!turnPlan) setSettledIndex(requestedIndex);
  }, [requestedIndex, turnPlan]);

  useEffect(() => {
    if (!capturePlan) {
      setPreparedTurn(null);
      return;
    }
    const source = turnCapture.current;
    if (!ready || opened || !source) return;
    const plan = capturePlan;
    let current = true;
    async function prepare(): Promise<void> {
      if (source?.querySelector("[data-markdown-loading]")) {
        await loadPageMarkdown();
        await new Promise<void>((done) => requestAnimationFrame(() => done()));
      }
      if (!current) return;
      const visibleStage = stage.current;
      const bounds = visibleStage?.getBoundingClientRect();
      if (!bounds) throw new Error("Missing book dimensions");
      const stageBounds: DOMRect = bounds;
      async function capture(
        face: (typeof turnFaces)[number]
      ): Promise<HTMLCanvasElement | null> {
        const panel = plan.panels[face];
        const page = pages[panel.index];
        if (!page) return null;
        const sheet = source?.querySelector<HTMLElement>(
          `[data-ink-face="${face}"] .book-sheet`
        );
        const article = sheet?.querySelector<HTMLElement>("article");
        if (!sheet || !article) throw new Error("Missing turning page");
        const visibleSheet = visibleStage?.querySelector<HTMLElement>(
          `:scope > [data-sheet="${panel.side}"]`
        );
        const visibleArticle =
          visibleSheet?.dataset.pageKey === pageKey(page)
            ? (visibleSheet.querySelector("article") ?? undefined)
            : undefined;
        const scrollSource = visibleArticle ?? article;
        const scroll = scrollSource.scrollTop;
        const tables = [
          ...scrollSource.querySelectorAll<HTMLElement>(".paper-table"),
        ];
        const cachedLayout = [
          pageKey(page),
          panel.side,
          Math.round(stageBounds.width),
          Math.round(stageBounds.height),
          scroll,
          ...tables.map((table) => table.scrollLeft),
        ].join(":");
        const reusable = !scrollSource.querySelector(
          "video,iframe,.paper-diagram-source,[aria-busy=true]"
        );
        if (reusable) {
          const cached = inkCache.current.get(cachedLayout);
          if (cached) return cached;
        }
        const first = article.firstElementChild;
        if (scroll && first instanceof HTMLElement) {
          // Capture the currently visible excerpt without moving the reader's scroll.
          const margin =
            Number.parseFloat(getComputedStyle(first).marginTop) || 0;
          article.style.height = `${scrollSource.clientHeight}px`;
          first.style.marginTop = `${margin - scroll}px`;
        }
        const image = await captureInk(
          article,
          sheet,
          stageBounds,
          visibleArticle
        );
        if (image && reusable) {
          const cache = inkCache.current;
          if (cache.size >= 6) {
            const oldest = cache.keys().next().value;
            if (oldest !== undefined) cache.delete(oldest);
          }
          cache.set(cachedLayout, image);
        }
        if (!image) throw new Error("Unable to render turning page");
        return image;
      }
      const [left, right, front, back] = await Promise.all([
        capture("left"),
        capture("right"),
        capture("front"),
        capture("back"),
      ]);
      if (current) setPreparedTurn({ plan, ink: { left, right, front, back } });
    }
    void prepare().catch(() => {
      if (current) setSceneFailed(true);
    });
    return () => {
      current = false;
    };
  }, [capturePlan, opened, pages, ready]);
  const paired = wide && start + 1 < pages.length;
  const step = wide ? 2 : 1;
  const previous = start - step;
  const following = start + step;
  const activePage = pages[index];
  const label = activePage?.title || book.title;

  useEffect(() => {
    if (!opened) return;
    const dialog = catalog.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    dialog
      .querySelector<HTMLElement>("[aria-current=page]")
      ?.scrollIntoView({ block: "nearest" });
  }, [opened]);

  useEffect(() => {
    const handler = (event: KeyboardEvent): void => {
      if (
        opened ||
        onPaperReady ||
        turnPlan ||
        document.querySelector(".diagram-viewer[open]") ||
        event.altKey ||
        event.metaKey ||
        event.ctrlKey ||
        event.defaultPrevented
      )
        return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest(
          "input,textarea,select,video,[contenteditable],.paper-table,.paper-embed"
        )
      )
        return;
      const target =
        event.key === "ArrowLeft"
          ? pages[previous]
          : event.key === "ArrowRight"
            ? pages[following]
            : undefined;
      if (!target) return;
      event.preventDefault();
      navigate(bookHref(book.id, target.id, target.section?.id));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [book.id, following, onPaperReady, opened, pages, previous, turnPlan]);

  function startSwipe(event: PointerEvent<HTMLDivElement>): void {
    swipe.current = undefined;
    if (
      wide ||
      opened ||
      onPaperReady ||
      event.pointerType !== "touch" ||
      !event.isPrimary
    )
      return;
    if (
      event.target instanceof Element &&
      event.target.closest(
        "a,button,input,select,textarea,video,iframe,pre,.paper-table,.paper-embed,[contenteditable]"
      )
    )
      return;
    swipe.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }

  function endSwipe(event: PointerEvent<HTMLDivElement>): void {
    const start = swipe.current;
    swipe.current = undefined;
    if (!start || start.id !== event.pointerId || opened || wide) return;
    const x = event.clientX - start.x;
    const y = event.clientY - start.y;
    if (Math.abs(x) < 48 || Math.abs(x) <= 1.4 * Math.abs(y)) return;
    const target = pages[x < 0 ? following : previous];
    if (target) navigate(bookHref(book.id, target.id, target.section?.id));
  }

  function confirmClose(): void {
    setOpened(false);
    requestAnimationFrame(() => contentsButton.current?.focus());
  }

  const rightIndex = wide ? start + 1 : start;
  const right = pages[rightIndex];
  const rightNumber = rightIndex + 1;
  return (
    <main
      tabIndex={-1}
      data-magic={magic || undefined}
      className={`reader ${opened ? "reader--catalog" : ""}`}
    >
      <header
        className="reader-header"
        data-magic-control={library.magicMode || undefined}
      >
        {library.shelf ? (
          <a href={shelfHref} className="brand" onClick={onReturn}>
            <ChevronLeft size={23} aria-hidden />
            {text.library}
          </a>
        ) : (
          <span className="brand">
            <BookOpen size={26} aria-hidden />
            {library.title}
          </span>
        )}
        {library.magicMode && (
          <button
            className="magic-mode"
            type="button"
            aria-pressed={magic}
            onClick={() => setMagic(!magic)}
          >
            <Sparkles size={18} aria-hidden /> {text.magic}
          </button>
        )}
        <button
          type="button"
          ref={contentsButton}
          className="contents-button"
          aria-haspopup="dialog"
          disabled={!!turnPlan}
          onClick={() => setOpened(true)}
        >
          <List size={22} aria-hidden />
          {text.contents}
        </button>
      </header>
      <div
        className="reader-stage"
        ref={stage}
        data-ready={showScene}
        data-binding={binding}
        style={style}
        data-wide={wide}
        data-frame={fittedRead ? "reading" : undefined}
        data-page-turn={!!turn}
        onScrollCapture={() => {
          if (!turnPlan) setAnticipated(undefined);
        }}
        onPointerDown={startSwipe}
        onPointerUp={endSwipe}
        onPointerCancel={() => {
          swipe.current = undefined;
        }}
      >
        {keptPaper ? (
          <div
            className="resting-art-slot"
            ref={initialPaperSlot}
            aria-hidden="true"
          />
        ) : (
          <div className="book-fallback" ref={paper} aria-hidden="true">
            {wide && (
              <div
                className="book-resting"
                style={{ backgroundImage: `url("${restingImage(binding)}")` }}
              />
            )}
          </div>
        )}
        {turnPlan && !turn && (
          <span
            className="page-pickup"
            data-direction={turnPlan.direction}
            aria-hidden="true"
          />
        )}
        {needsScene && (
          <div className="book-scene" aria-hidden="true">
            <Suspense fallback={null}>
              <BookScene
                binding={binding}
                fittedRead={fittedRead}
                onReady={sceneReady}
                turn={turn}
                onTurnDone={finishTurn}
              />
            </Suspense>
          </div>
        )}
        {wide && (
          <Sheet
            key={pages[start] ? pageKey(pages[start]) : "blank"}
            page={pages[start]}
            side="left"
            number={start + 1}
            anchor={start === index ? activeAnchor : null}
            bookTitle={book.title}
            text={text}
            locale={library.locale}
          />
        )}
        <Sheet
          key={right ? pageKey(right) : "blank-right"}
          page={right}
          side="right"
          number={rightNumber}
          anchor={index === rightIndex ? activeAnchor : null}
          bookTitle={book.title}
          text={text}
          locale={library.locale}
        />
        {capturePlan && ready && !turn && !opened && (
          <div
            className="turn-capture"
            ref={turnCapture}
            aria-hidden="true"
            inert
          >
            {turnFaces.map((face) => {
              const panel = capturePlan.panels[face];
              return (
                pages[panel.index] && (
                  <div
                    className="turn-capture-face"
                    data-ink-face={face}
                    key={face}
                  >
                    <Sheet
                      page={pages[panel.index]}
                      number={panel.index + 1}
                      side={panel.side}
                      anchor={null}
                      bookTitle={book.title}
                      text={text}
                      locale={library.locale}
                    />
                  </div>
                )
              );
            })}
          </div>
        )}
      </div>
      <nav className="reader-pagination" aria-label={text.contents}>
        {pages[previous] ? (
          <a
            className="turn-button"
            href={bookHref(
              book.id,
              pages[previous].id,
              pages[previous].section?.id
            )}
            aria-label={text.previous}
            aria-disabled={!!turnPlan}
            tabIndex={turnPlan ? -1 : undefined}
            onClick={(event) => {
              if (turnPlan) event.preventDefault();
            }}
            onPointerEnter={() => anticipateTurn(previous)}
            onFocus={() => anticipateTurn(previous)}
          >
            <ChevronLeft aria-hidden size={24} />
          </a>
        ) : (
          <button
            type="button"
            className="turn-button"
            aria-label={text.previous}
            disabled
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <div className="reading-position" aria-live="polite">
          <span title={label}>{label}</span>
          <span>
            {paired ? `${start + 1}–${start + 2}` : start + 1} / {pages.length}
          </span>
        </div>
        {pages[following] ? (
          <a
            className="turn-button"
            href={bookHref(
              book.id,
              pages[following].id,
              pages[following].section?.id
            )}
            aria-label={text.next}
            aria-disabled={!!turnPlan}
            tabIndex={turnPlan ? -1 : undefined}
            onClick={(event) => {
              if (turnPlan) event.preventDefault();
            }}
            onPointerEnter={() => anticipateTurn(following)}
            onFocus={() => anticipateTurn(following)}
          >
            <ChevronRight aria-hidden size={24} />
          </a>
        ) : (
          <button
            type="button"
            className="turn-button"
            aria-label={text.next}
            disabled
          >
            <ChevronRight size={24} />
          </button>
        )}
      </nav>
      <dialog
        className="catalog"
        ref={catalog}
        onPointerDown={(event) => {
          if (event.target === event.currentTarget) catalog.current?.close();
        }}
        onClose={confirmClose}
        aria-labelledby={opened ? "catalog-title" : undefined}
      >
        {opened && (
          <div className="catalog-paper">
            <div className="catalog-header">
              <h2 id="catalog-title">{text.contents}</h2>
              <button
                type="button"
                aria-label={text.close}
                onClick={() => catalog.current?.close()}
              >
                <X aria-hidden size={24} />
              </button>
            </div>
            <ol
              className="catalog-pages"
              style={
                {
                  "--folio-digits": String(pages.length).length,
                } as CSSProperties
              }
            >
              {entries.map((entry) => {
                const active = activePage?.id === entry.id;
                const nested = entry.sections;
                const showPages = nested.length > 0 && !collapsed.has(entry.id);
                const activeSection =
                  active && showPages && (index > entry.first || activeAnchor)
                    ? activePage.section?.id
                    : undefined;
                return (
                  <li key={entry.id}>
                    <div
                      className="catalog-row"
                      data-expandable={nested.length > 0 || undefined}
                    >
                      <a
                        href={bookHref(book.id, entry.id)}
                        aria-current={
                          active && !activeSection ? "page" : undefined
                        }
                        onClick={() => catalog.current?.close()}
                      >
                        <span className="catalog-label">{entry.label}</span>
                        <span className="catalog-leader" aria-hidden="true" />
                        <span className="catalog-folio">{entry.first + 1}</span>
                      </a>
                      {nested.length > 0 && (
                        <button
                          type="button"
                          className="catalog-expand"
                          aria-label={text.chapterPages(entry.label)}
                          aria-expanded={showPages}
                          onClick={() =>
                            setCollapsed((current) => {
                              const next = new Set(current);
                              if (next.has(entry.id)) next.delete(entry.id);
                              else next.add(entry.id);
                              return next;
                            })
                          }
                        >
                          <ChevronDown aria-hidden size={15} />
                        </button>
                      )}
                    </div>
                    {showPages && (
                      <ol className="catalog-nested">
                        {nested.map(({ section, position }) => (
                          <li key={section.id}>
                            <a
                              href={bookHref(book.id, entry.id, section.id)}
                              aria-current={
                                activeSection === section.id
                                  ? "page"
                                  : undefined
                              }
                              onClick={() => catalog.current?.close()}
                            >
                              <span className="catalog-label">
                                {section.title}
                              </span>
                              <span
                                className="catalog-leader"
                                aria-hidden="true"
                              />
                              <span className="catalog-folio">
                                {position + 1}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </dialog>
    </main>
  );
}
