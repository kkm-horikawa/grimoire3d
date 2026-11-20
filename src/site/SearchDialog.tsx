import { ChevronRight, Search, X } from "lucide-react";
import {
  type JSX,
  type MouseEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { assetHref, bookHref, navigate } from "./navigation";
import type { BookSummary, Copy } from "./types";
import "./search-dialog.css";

interface SearchSection {
  chapter: string;
  title: string;
  anchor?: string;
  heading?: string;
  text: string;
}

interface SearchBook {
  id: string;
  title: string;
  sections: SearchSection[];
}

interface Result {
  book: SearchBook;
  section?: SearchSection;
  excerpt?: string;
  rank: number;
}

const batchSize = 30;

function searchResults(
  books: SearchBook[],
  pattern: RegExp,
  scoped: boolean
): Result[] {
  const results: Result[] = [];
  for (const book of books) {
    const bookMatch = !scoped && pattern.test(book.title);
    if (bookMatch) results.push({ book, rank: 0 });
    for (const section of book.sections) {
      const titleMatch = !section.anchor && pattern.test(section.title);
      const headingMatch = Boolean(
        section.heading && pattern.test(section.heading)
      );
      const found = section.text.search(pattern);
      if (!titleMatch && !headingMatch && found < 0) continue;
      if (bookMatch && titleMatch && section.title === book.title && found < 0)
        continue;
      const start = Math.max(0, found - 48);
      const end = Math.min(section.text.length, start + 158);
      const excerpt =
        (start > 0 ? "…" : "") +
        section.text.slice(start, end) +
        (end < section.text.length ? "…" : "");
      results.push({
        book,
        section,
        excerpt,
        rank: titleMatch ? 1 : headingMatch ? 2 : 3,
      });
    }
  }
  return results.sort((left, right) => left.rank - right.rank);
}

function highlighted(value: string, pattern: RegExp): JSX.Element {
  const matches = [...value.matchAll(new RegExp(pattern.source, "giu"))];
  let end = 0;
  const parts = matches.map((match) => {
    const start = match.index;
    const prefix = value.slice(end, start);
    end = start + match[0].length;
    return (
      <span key={start}>
        {prefix}
        <mark>{match[0]}</mark>
      </span>
    );
  });
  return (
    <>
      {parts}
      {value.slice(end)}
    </>
  );
}

export default function SearchDialog({
  book,
  text,
  onClose,
}: {
  book?: Pick<BookSummary, "id" | "title">;
  text: Copy;
  onClose: () => void;
}): JSX.Element {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [books, setBooks] = useState<SearchBook[]>();
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(batchSize);
  const path = book
    ? `search/books/${encodeURIComponent(book.id)}.json`
    : "search/library.json";
  const heading = book ? text.searchBook : text.searchLibrary;
  const looking = query.trim().normalize("NFC");
  const pattern = useMemo(
    () =>
      looking
        ? new RegExp(looking.replace(/[.*+?^$(){}|[\]\\]/g, "\\$&"), "iu")
        : undefined,
    [looking]
  );
  const results = useMemo(
    () =>
      books && pattern ? searchResults(books, pattern, Boolean(book)) : [],
    [books, pattern, book]
  );

  useLayoutEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    modal.showModal();
    input.current?.focus({ preventScroll: true });
    const viewport = window.visualViewport;
    if (!viewport) return;
    const measure = (): void => {
      modal.style.setProperty(
        "--search-viewport-height",
        `${viewport.height}px`
      );
    };
    measure();
    viewport.addEventListener("resize", measure);
    return () => viewport.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const request = new AbortController();
    void fetch(assetHref(path), { signal: request.signal })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json() as Promise<SearchBook[]>;
      })
      .then(setBooks)
      .catch(() => {
        if (!request.signal.aborted) setFailed(true);
      });
    return () => request.abort();
  }, [path]);

  function select(event: MouseEvent<HTMLAnchorElement>): void {
    if (
      event.button !== 0 ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    )
      return;
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    if (!href) return;
    dialog.current?.close();
    navigate(href);
  }

  return (
    <dialog
      ref={dialog}
      className="text-search-dialog"
      aria-labelledby="text-search-title"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        event.stopPropagation();
        dialog.current?.close();
      }}
    >
      <header className="text-search-heading">
        <h2 id="text-search-title">{heading}</h2>
        <button
          type="button"
          aria-label={text.close}
          onClick={() => dialog.current?.close()}
        >
          <X aria-hidden size={20} />
        </button>
        {book && <p>{book.title}</p>}
      </header>
      <div className="text-query">
        <Search aria-hidden size={19} />
        <input
          ref={input}
          type="search"
          aria-label={text.searchQuery}
          placeholder={text.searchQuery}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setShown(batchSize);
          }}
          onKeyDown={(event) => {
            if (event.key !== "ArrowDown") return;
            event.preventDefault();
            list.current?.querySelector("a")?.focus();
          }}
        />
      </div>
      <p className="text-search-status" role="status">
        {failed
          ? text.searchUnavailable
          : !books
            ? text.searchLoading
            : looking
              ? text.searchResults(results.length)
              : ""}
      </p>
      {pattern && results.length > 0 && (
        <div className="text-search-results">
          <ol ref={list}>
            {results
              .slice(0, shown)
              .map(({ book: resultBook, section, excerpt }) => (
                <li
                  key={JSON.stringify([
                    resultBook.id,
                    section?.chapter,
                    section?.anchor,
                  ])}
                >
                  <a
                    href={bookHref(
                      resultBook.id,
                      section?.chapter,
                      section?.anchor
                    )}
                    onClick={select}
                  >
                    <div>
                      {!book && section && <small>{resultBook.title}</small>}
                      {section?.heading &&
                        section.title !== resultBook.title && (
                          <small>{section.title}</small>
                        )}
                      <strong>
                        {highlighted(
                          section?.heading ??
                            section?.title ??
                            resultBook.title,
                          pattern
                        )}
                      </strong>
                      {excerpt && (
                        <span className="text-search-excerpt">
                          {highlighted(excerpt, pattern)}
                        </span>
                      )}
                    </div>
                    <ChevronRight aria-hidden size={19} />
                  </a>
                </li>
              ))}
          </ol>
          {shown < results.length && (
            <button
              type="button"
              className="text-search-more"
              onClick={() => setShown(shown + batchSize)}
            >
              {text.searchMore}
            </button>
          )}
        </div>
      )}
    </dialog>
  );
}
