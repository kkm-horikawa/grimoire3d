import { BookOpen, ChevronDown, ChevronRight, Search, X } from "lucide-react";
import {
  type CSSProperties,
  type JSX,
  type MouseEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { LibraryFooter } from "../../cli/library-footer.js";
import { type CoverOrigin, motionQuery } from "./BookTransition";
import { coverFor } from "./covers";
import { bookHref, initialShelfArt } from "./navigation";
import type { BookSummary, Copy, Library } from "./types";

export const shelfBatchSize = 12;

export interface ShelfState {
  mode: "shelves" | "index";
  query: string;
  category: string;
  newestFirst: boolean;
  scroll: number;
  focus: string;
  shown: number;
}

interface LibraryViewProps {
  library: Library;
  text: Copy;
  state: ShelfState;
  onState: (state: ShelfState) => void;
  openingBookId?: string;
  onOpenVolume: (origin: CoverOrigin) => void;
  onLocateVolume?: (origin: CoverOrigin | null) => void;
}

function normalize(text: string): string {
  return text.normalize("NFKC").toLowerCase().trim();
}

function Volume({
  book,
  onOpen,
  front = false,
  opening,
}: {
  book: BookSummary;
  onOpen: (event: MouseEvent<HTMLAnchorElement>) => void;
  opening: boolean;
  front?: boolean;
}): JSX.Element {
  const finish = coverFor(book.id, book.cover);
  const cover = (
    <>
      <picture>
        <source media="(max-width: 699px)" srcSet={finish.compact} />
        <img
          className="volume-render"
          width={600}
          height={760}
          src={finish.src}
          alt=""
          loading={front ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
      <span className="volume-title">{book.title}</span>
    </>
  );
  return (
    <a
      className="volume"
      href={bookHref(book.id)}
      data-book={book.id}
      data-cover={finish.binding}
      style={finish.style}
      data-opening={opening || undefined}
      aria-label={book.title}
      title={book.title}
      onClick={onOpen}
    >
      {cover}
    </a>
  );
}

export function LibraryView({
  library,
  text,
  state,
  onState,
  openingBookId,
  onOpenVolume,
  onLocateVolume,
}: LibraryViewProps): JSX.Element {
  const { locale, books } = library;
  const { mode, query, category, newestFirst, scroll, focus, shown } = state;
  const search = useRef<HTMLInputElement>(null);
  const root = useRef<HTMLElement>(null);
  const origins = useRef(new Map<string, DOMRect>());
  const readyToRestore = useRef(true);
  const returning = useRef(false);
  const skipSearchAnimation = useRef(Boolean(onLocateVolume));
  const moreShelves = useRef<HTMLDivElement>(null);
  const moving = useRef<Animation[]>([]);
  const visible = useRef(new Set<HTMLAnchorElement>());
  const shelfArtSlot = useRef<HTMLDivElement>(null);
  const looking = normalize(query);
  const filtering = Boolean(looking || category);
  const restingShelf = mode === "shelves" && !filtering;
  useLayoutEffect(() => {
    const slot = shelfArtSlot.current;
    const art = initialShelfArt;
    if (!restingShelf || !slot || !art) return;
    slot.append(art);
    return () => art.remove();
  }, [restingShelf]);
  const large = books.length > 6;
  const categories = useMemo(() => {
    const names = books.flatMap((book) =>
      book.category ? [book.category] : []
    );
    return [...new Set(names)].sort((left, right) =>
      left.localeCompare(right, locale)
    );
  }, [books, locale]);
  const hasCategories = categories.length > 0;
  const hasDates = books.some((book) => book.date);
  const results = useMemo(() => {
    const matches = filtering
      ? books.filter(
          (book) =>
            (!category || book.category === category) &&
            (!looking ||
              normalize(book.title).includes(looking) ||
              normalize(book.id).includes(looking))
        )
      : books;
    if (newestFirst) {
      return [...matches].sort(
        (left, right) =>
          (right.date ?? "").localeCompare(left.date ?? "", "en") ||
          left.title.localeCompare(right.title, locale, { numeric: true }) ||
          left.id.localeCompare(right.id, locale)
      );
    }
    if (mode === "index") {
      return [...matches].sort((left, right) =>
        left.title.localeCompare(right.title, locale, { numeric: true })
      );
    }
    return matches;
  }, [books, category, filtering, locale, looking, mode, newestFirst]);
  const shownResults = useMemo(
    () => (mode === "shelves" ? results.slice(0, shown) : results),
    [mode, results, shown]
  );
  const canShowMore = mode === "shelves" && shown < results.length;

  useEffect(() => {
    const marker = moreShelves.current;
    if (openingBookId || !marker || !canShowMore) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          onState({
            ...state,
            shown: Math.min(shown + shelfBatchSize, results.length),
          });
        }
      },
      { rootMargin: "250px 0px" }
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, [canShowMore, onState, openingBookId, results.length, shown, state]);

  useEffect(() => {
    if (mode !== "shelves") return;
    const collection = new Set<HTMLAnchorElement>();
    visible.current = collection;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!(entry.target instanceof HTMLAnchorElement)) continue;
        if (entry.isIntersecting) collection.add(entry.target);
        else collection.delete(entry.target);
      }
    });
    const links =
      root.current?.querySelectorAll<HTMLAnchorElement>("[data-book]") ?? [];
    const renderedBooks = new Set(shownResults.map((book) => book.id));
    for (const link of links) {
      if (renderedBooks.has(link.dataset.book ?? "")) observer.observe(link);
    }
    return () => observer.disconnect();
  }, [mode, shownResults]);

  const resultElements = useCallback((): HTMLAnchorElement[] => {
    return Array.from(
      root.current?.querySelectorAll<HTMLAnchorElement>("[data-book]") ?? []
    );
  }, []);

  useLayoutEffect(() => {
    if (!readyToRestore.current && !(returning.current && !openingBookId))
      return;
    readyToRestore.current = false;
    window.scrollTo(0, scroll);
    if (openingBookId) return;
    resultElements()
      .find((element) => element.dataset.book === focus)
      ?.focus({ preventScroll: true });
  }, [focus, openingBookId, resultElements, scroll]);

  useLayoutEffect(() => {
    returning.current = Boolean(openingBookId);
  }, [openingBookId]);

  useLayoutEffect(() => {
    if (skipSearchAnimation.current) {
      skipSearchAnimation.current = false;
      return;
    }
    if (mode !== "shelves" || window.matchMedia(motionQuery).matches) return;
    const elements = Array.from(
      root.current?.querySelectorAll<HTMLElement>("[data-book]") ?? []
    );
    for (const animation of moving.current) animation.cancel();
    moving.current = [];
    for (const [index, result] of elements.entries()) {
      const from = origins.current.get(result.dataset.book ?? "");
      if (!from && (!looking || index >= 6)) continue;
      const current = result.getBoundingClientRect();
      const x = from ? from.left - current.left : 0;
      const y = from ? from.top - current.top : 32;
      const scale = from
        ? Math.max(0.6, Math.min(1.2, from.width / current.width))
        : 0.82;
      moving.current.push(
        result.animate(
          [
            {
              translate: `${x}px ${y}px`,
              scale: String(scale),
              opacity: from ? 1 : 0.48,
            },
            { translate: "0px 0px", scale: "1", opacity: 1 },
          ],
          { duration: 360, easing: "cubic-bezier(.22,.9,.32,1)" }
        )
      );
    }
    origins.current.clear();
  }, [looking, mode]);

  useLayoutEffect(() => {
    if (!onLocateVolume) return;
    const book = shownResults.find(({ id }) => id === openingBookId);
    const link = resultElements().find(
      (element) => element.dataset.book === openingBookId
    );
    const rect = link?.getBoundingClientRect();
    onLocateVolume(
      book && link && rect && rect.bottom > 0 && rect.top < window.innerHeight
        ? {
            id: book.id,
            title: book.title,
            cover: book.cover,
            src:
              link.querySelector("img")?.currentSrc ||
              coverFor(book.id, book.cover).src,
            rect,
          }
        : null
    );
  }, [onLocateVolume, openingBookId, resultElements, shownResults]);

  function updateSearch(value: string): void {
    origins.current = new Map(
      mode === "shelves"
        ? [...visible.current].map((item) => [
            item.dataset.book ?? "",
            item.getBoundingClientRect(),
          ])
        : []
    );
    onState({ ...state, query: value, shown: shelfBatchSize });
    window.scrollTo(0, 0);
  }

  function updateCatalogOptions(
    nextCategory: string,
    useNewest: boolean
  ): void {
    onState({
      ...state,
      category: nextCategory,
      newestFirst: useNewest,
      shown: shelfBatchSize,
      scroll: 0,
      focus: "",
    });
    window.scrollTo(0, 0);
  }

  function openVolume(
    book: BookSummary,
    event: MouseEvent<HTMLAnchorElement>
  ): void {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    )
      return;
    onState({ ...state, scroll: window.scrollY, focus: book.id });
    if (matchMedia(motionQuery).matches) return;
    event.preventDefault();
    const link = event.currentTarget;
    onOpenVolume({
      id: book.id,
      title: book.title,
      cover: book.cover,
      src:
        link.querySelector("img")?.currentSrc ||
        coverFor(book.id, book.cover).src,
      rect: link.getBoundingClientRect(),
    });
  }

  return (
    <main className="library" ref={root} data-searching={filtering}>
      <header className="library-brand brand">
        <BookOpen aria-hidden size={25} />
        {library.title}
      </header>
      <div
        className={
          large ? "library-heading library-heading-sticky" : "library-heading"
        }
      >
        <h1>{text.library}</h1>
        {(large || hasCategories || hasDates) && (
          <div className="library-tools">
            <search className="search-region">
              <form
                className="shelf-search"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (results.length === 1) resultElements()[0]?.click();
                  else resultElements()[0]?.focus();
                }}
              >
                <Search aria-hidden size={18} />
                <input
                  ref={search}
                  type="search"
                  aria-label={text.find}
                  placeholder={text.find}
                  value={query}
                  onChange={(event) => updateSearch(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      resultElements()[0]?.focus();
                    }
                    if (event.key === "Escape" && query) updateSearch("");
                  }}
                />
                {query && (
                  <button
                    type="button"
                    aria-label={text.clear}
                    onClick={() => {
                      updateSearch("");
                      search.current?.focus();
                    }}
                  >
                    <X aria-hidden size={17} />
                  </button>
                )}
              </form>
            </search>
            <div className="segment segment-library">
              <button
                type="button"
                aria-pressed={mode === "shelves"}
                onClick={() => {
                  onState({ ...state, mode: "shelves" });
                  window.scrollTo(0, 0);
                }}
              >
                {text.shelves}
              </button>
              <button
                type="button"
                aria-pressed={mode === "index"}
                onClick={() => {
                  onState({ ...state, mode: "index" });
                  window.scrollTo(0, 0);
                }}
              >
                {text.index}
              </button>
            </div>
          </div>
        )}
        {(hasCategories || hasDates) && (
          <div className="catalog-options">
            {hasCategories && (
              <div className="catalog-option">
                <select
                  aria-label={text.category}
                  value={category}
                  onChange={(event) =>
                    updateCatalogOptions(event.target.value, newestFirst)
                  }
                >
                  <option value="">{text.allCategories}</option>
                  {categories.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <ChevronDown aria-hidden size={16} />
              </div>
            )}
            {hasDates && (
              <div className="catalog-option">
                <select
                  aria-label={text.sort}
                  value={newestFirst ? "newest" : "default"}
                  onChange={(event) =>
                    updateCatalogOptions(
                      category,
                      event.target.value === "newest"
                    )
                  }
                >
                  <option value="default">{text.defaultOrder}</option>
                  <option value="newest">{text.newestFirst}</option>
                </select>
                <ChevronDown aria-hidden size={16} />
              </div>
            )}
          </div>
        )}
      </div>
      {filtering && (
        <output className="book-count">
          {results.length === 0 ? text.zero : text.matches(results.length)}
        </output>
      )}
      {mode === "index" ? (
        <>
          {!filtering && (
            <p className="book-count index-count">{text.count(books.length)}</p>
          )}
          <ul className="library-index">
            {results.map((book) => (
              <li key={book.id}>
                <a
                  href={bookHref(book.id)}
                  data-book={book.id}
                  onClick={() =>
                    onState({
                      ...state,
                      scroll: window.scrollY,
                      focus: book.id,
                    })
                  }
                >
                  <span
                    className="index-spine"
                    style={
                      {
                        "--hue": coverFor(book.id, book.cover).hue,
                      } as CSSProperties
                    }
                    aria-hidden
                  />
                  <span>{book.title}</span>
                  <ChevronRight size={20} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div
          data-mobile-rows={
            books.length >= 3 && books.length <= 4 ? "2" : undefined
          }
          className={`shelf ${large ? "shelf-many" : ""} ${restingShelf ? "resting-shelf" : ""} ${filtering ? "shelf-searching" : ""} ${filtering && results.length === 1 ? "shelf-one-match" : ""}`}
        >
          {restingShelf &&
            (initialShelfArt ? (
              <div
                className="resting-art-slot"
                ref={shelfArtSlot}
                aria-hidden="true"
              />
            ) : (
              <div className="shelf-art" aria-hidden="true" />
            ))}
          <div className="shelf-grid">
            {shownResults.map((book, position) => (
              <div className="shelf-cell" key={book.id}>
                <Volume
                  book={book}
                  front={position < 3}
                  opening={openingBookId === book.id}
                  onOpen={(event) => openVolume(book, event)}
                />
              </div>
            ))}
          </div>
          {canShowMore && (
            <div ref={moreShelves} className="more-shelves" aria-hidden />
          )}
        </div>
      )}
      {!canShowMore && <LibraryFooter publisher={library.footer} />}
    </main>
  );
}
