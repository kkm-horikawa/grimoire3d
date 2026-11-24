import {
  type JSX,
  lazy,
  type MouseEvent,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import {
  BookTransition,
  type CoverOrigin,
  motionQuery,
} from "./BookTransition";
import { LibraryView, type ShelfState, shelfBatchSize } from "./LibraryView";
import {
  assetHref,
  bookHref,
  initialSmallScreenArt,
  interceptReaderLink,
  navigate,
  readLocation,
  shelfHref,
} from "./navigation";
import { type Book, copy, type Library } from "./types";
import "katex/dist/katex.min.css";
import "./style.css";

const BookReader = lazy(() =>
  import("./BookReader").then(({ BookReader }) => ({ default: BookReader }))
);

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(assetHref(path), { signal });
  if (response.status === 422) {
    const error = await response.json();
    throw new Error(error.error);
  }
  if (!response.ok) throw new Error(`${path} (${response.status})`);
  return response.json();
}

type ShelfTransition =
  | { direction: "open"; id: string; origin: CoverOrigin }
  | { direction: "close"; id: string };

type ReadyReader = typeof import("./BookReader").BookReader;

function App({
  library,
  initialBook,
  initialReader,
}: {
  library: Library;
  initialBook?: Book;
  initialReader?: ReadyReader;
}): JSX.Element {
  const [route, setRoute] = useState(readLocation);
  const [books, setBooks] = useState(() =>
    initialBook
      ? new Map([[initialBook.id, initialBook]])
      : new Map<string, Book>()
  );
  const Reader = initialReader ?? BookReader;
  useLayoutEffect(activateArtwork, []);
  const [failed, setFailed] = useState("");
  const [transition, setTransition] = useState<ShelfTransition | null>(null);
  const [returnOrigin, setReturnOrigin] = useState<CoverOrigin>();
  const focusReader = useRef(false);
  const [paper, setPaper] = useState<HTMLElement | null>(null);
  const [phase, setPhase] = useState<"ready" | "travel" | "hinge">("ready");
  const [shelfState, setShelfState] = useState<ShelfState>({
    mode: "shelves",
    query: "",
    category: "",
    newestFirst: false,
    scroll: 0,
    focus: "",
    shown: shelfBatchSize,
  });
  const text = copy[library.locale];
  const summary = route.book
    ? library.books.find((book) => book.id === route.book)
    : library.shelf
      ? undefined
      : library.books[0];
  const id = summary?.id;
  const book = id ? books.get(id) : undefined;
  const active =
    transition && transition.id === id && failed !== id ? transition : null;
  const direction = active?.direction;
  const showingShelf = !route.book && library.shelf;
  const origin = active?.direction === "open" ? active.origin : returnOrigin;
  const paperVisible =
    direction === "close" ? phase !== "travel" : phase === "hinge";

  const finishTransition = useCallback((): void => {
    setTransition(null);
    setReturnOrigin(undefined);
    setPaper(null);
    setPhase("ready");
    if (direction === "close") {
      navigate(shelfHref);
      setRoute(readLocation());
    } else {
      focusReader.current = true;
    }
  }, [direction]);

  useLayoutEffect(() => {
    if (active || !focusReader.current) return;
    focusReader.current = false;
    window.scrollTo(0, 0);
    document
      .querySelector<HTMLElement>(".reader")
      ?.focus({ preventScroll: true });
  }, [active]);

  const locateReturnVolume = useCallback(
    (volume: CoverOrigin | null): void => {
      if (volume) setReturnOrigin(volume);
      else finishTransition();
    },
    [finishTransition]
  );

  function openVolume(origin: CoverOrigin): void {
    if (transition) return;
    setPhase("travel");
    setTransition({ direction: "open", id: origin.id, origin });
    navigate(bookHref(origin.id));
    setRoute(readLocation());
  }

  function closeVolume(event: MouseEvent<HTMLAnchorElement>): void {
    if (
      !id ||
      transition ||
      shelfState.mode !== "shelves" ||
      event.button !== 0 ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      matchMedia(motionQuery).matches
    )
      return;
    event.preventDefault();
    setPhase("ready");
    setTransition({ direction: "close", id });
  }

  useEffect(() => {
    const apply = (): void => {
      const next = readLocation();
      setTransition((current) => (current?.id === next.book ? current : null));
      setRoute(next);
    };
    window.history.scrollRestoration = "manual";
    window.addEventListener("hashchange", apply);
    window.addEventListener("popstate", apply);
    document.addEventListener("click", interceptReaderLink);
    return () => {
      window.removeEventListener("hashchange", apply);
      window.removeEventListener("popstate", apply);
      document.removeEventListener("click", interceptReaderLink);
    };
  }, []);

  useEffect(() => {
    if (transition && failed === transition.id) {
      setTransition(null);
    }
    if (!active) {
      setReturnOrigin(undefined);
      setPaper(null);
      setPhase("ready");
    }
  }, [active, failed, transition]);

  useEffect(() => {
    if (!id || book) return;
    const request = new AbortController();
    getJson<Book>(`./books/${encodeURIComponent(id)}.json`, request.signal)
      .then((data) => {
        setBooks((loaded) => new Map(loaded).set(id, data));
      })
      .catch(() => {
        if (!request.signal.aborted) setFailed(id);
      });
    return () => request.abort();
  }, [book, id]);

  useEffect(() => {
    const chapter = book?.pages.find((page) => page.id === route.page);
    const title =
      chapter?.id === "index"
        ? summary?.title
        : (chapter?.title ?? summary?.title);
    document.title =
      title && title !== library.title
        ? `${title} · ${library.title}`
        : library.title;
  }, [book, library.title, route.page, summary]);

  const loading = (
    <main className="status-screen" aria-busy="true">
      {text.loading}
    </main>
  );
  return (
    <>
      {(showingShelf || active) && (
        <div inert={!!active}>
          <LibraryView
            library={library}
            text={text}
            state={shelfState}
            onState={setShelfState}
            openingBookId={active?.id}
            onLocateVolume={
              direction === "close" ? locateReturnVolume : undefined
            }
            onOpenVolume={openVolume}
          />
        </div>
      )}
      {active && (
        <div
          className="book-transition-backdrop"
          data-paper={paperVisible}
          aria-hidden="true"
        />
      )}
      {!showingShelf && (
        <div
          className={active ? "reader-transition-shell" : undefined}
          data-direction={direction}
          data-phase={active ? phase : undefined}
          data-paper={active ? paperVisible : undefined}
          inert={!!active}
        >
          {!id || failed === id ? (
            <main className="status-screen">
              <p>{text.unavailable}</p>
              <a href={shelfHref}>{text.library}</a>
            </main>
          ) : book ? (
            <Suspense fallback={loading}>
              <Reader
                key={id}
                library={library}
                text={text}
                book={book}
                pageId={route.page}
                anchor={route.anchor}
                onPaperReady={active ? setPaper : undefined}
                onReturn={closeVolume}
              />
            </Suspense>
          ) : (
            loading
          )}
        </div>
      )}
      {active && origin && (
        <BookTransition
          origin={origin}
          direction={active.direction}
          paper={paper}
          onStage={setPhase}
          onDone={finishTransition}
        />
      )}
    </>
  );
}

const originalMarkup = document.getElementById("root");

function activateArtwork(): (() => void) | undefined {
  const original = originalMarkup;
  if (!initialSmallScreenArt || !original) return;

  // Keep the same mobile paper or shelf on screen as readable markup is enhanced.
  const page = document.documentElement;
  const interaction = [
    "pointerdown",
    "keydown",
    "hashchange",
    "popstate",
    "resize",
  ];
  const release = (): void => {
    delete page.dataset.initialArt;
    original.hidden = true;
    for (const event of interaction)
      window.removeEventListener(event, release, true);
  };
  original.inert = true;
  original.setAttribute("aria-hidden", "true");
  page.dataset.initialArt = initialSmallScreenArt;
  for (const event of interaction)
    window.addEventListener(event, release, { capture: true, once: true });
  return release;
}

const element = originalMarkup;
if (element) {
  const mount = initialSmallScreenArt ? document.createElement("div") : element;
  if (mount !== element) {
    mount.id = "grimoire-app";
    element.after(mount);
  }
  const root = createRoot(mount);
  async function bootstrap(): Promise<void> {
    const initial = document.getElementById("grimoire-initial")?.textContent;
    const data: { library: Library; book?: Book } = initial
      ? JSON.parse(initial)
      : { library: await getJson<Library>("./library.json") };
    const reader = data.book
      ? (await import("./BookReader")).BookReader
      : undefined;
    document.documentElement.lang = data.library.locale;
    root.render(
      <App
        library={data.library}
        initialBook={data.book}
        initialReader={reader}
      />
    );
  }
  void bootstrap().catch((error: Error) => {
    if (mount !== element) return;
    root.render(
      <main className="status-screen" role="alert">
        {error.message}
      </main>
    );
  });

  if (document.querySelector('meta[name="grimoire-preview"]')) {
    const events = new EventSource(assetHref("./__grimoire_events"));
    events.addEventListener("update", () => location.reload());
  }
}
