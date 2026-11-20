import { Search } from "lucide-react";
import { type JSX, lazy, Suspense, useRef, useState } from "react";
import type { BookSummary, Copy } from "./types";

const SearchDialog = lazy(() => import("./SearchDialog"));

export function SearchControl({
  text,
  book,
  disabled,
}: {
  text: Copy;
  book?: Pick<BookSummary, "id" | "title">;
  disabled?: boolean;
}): JSX.Element {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const label = book ? text.searchBook : text.searchText;
  return (
    <>
      <button
        className={`text-search-button${book ? " reader-search-button" : ""}`}
        type="button"
        aria-label={label}
        aria-haspopup="dialog"
        ref={trigger}
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        <Search size={18} aria-hidden />
        <span>{label}</span>
      </button>
      {open && (
        <Suspense fallback={null}>
          <SearchDialog
            text={text}
            book={book}
            onClose={() => {
              setOpen(false);
              trigger.current?.focus();
            }}
          />
        </Suspense>
      )}
    </>
  );
}
