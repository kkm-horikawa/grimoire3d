import { fireEvent, render, screen } from "@testing-library/react";
import { type JSX, useState } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  LibraryView,
  type ShelfState,
  shelfBatchSize,
} from "../../src/site/LibraryView";
import { type BookSummary, copy } from "../../src/site/types";

vi.hoisted(() => {
  vi.stubGlobal("matchMedia", () => ({ matches: true }));
});

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe(): void {}
      disconnect(): void {}
    }
  );
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
});

function Demo({ books }: { books: BookSummary[] }): JSX.Element {
  const [state, onState] = useState<ShelfState>({
    mode: "shelves",
    query: "",
    category: "",
    newestFirst: false,
    focus: "",
    scroll: 0,
    shown: shelfBatchSize,
  });
  return (
    <LibraryView
      library={{ title: "Field Library", locale: "en", shelf: true, books }}
      text={copy.en}
      state={state}
      onState={onState}
      onOpenVolume={() => {}}
    />
  );
}

function titles(): Array<string | null> {
  return screen
    .getAllByRole("link")
    .filter((link) => link.getAttribute("href")?.startsWith("#/"))
    .map((link) => link.getAttribute("aria-label") ?? link.textContent);
}

describe("library categories and publication dates", () => {
  it.each([
    [{}, false, false],
    [{ category: "Field work" }, true, false],
    [{ date: "2026-11-19" }, false, true],
    [{ category: "Field work", date: "2026-11-19" }, true, true],
  ])(
    "shows only the controls enabled by a small library",
    (metadata, category, date) => {
      render(<Demo books={[{ id: "notes", title: "Notes", ...metadata }]} />);
      expect(!!screen.queryByRole("combobox", { name: "Category" })).toBe(
        category
      );
      expect(!!screen.queryByRole("combobox", { name: "Sort books" })).toBe(
        date
      );
    }
  );

  it("composes category, title search, and newest-first order in both views", () => {
    render(
      <Demo
        books={[
          { id: "01", title: "Undated notes", category: "Experiments" },
          {
            id: "02",
            title: "Zeta notes",
            category: "Experiments",
            date: "2026-11-19",
          },
          {
            id: "03",
            title: "Alpha notes",
            category: "Experiments",
            date: "2026-11-19",
          },
          {
            id: "04",
            title: "News notes",
            category: "News",
            date: "2026-11-20",
          },
          {
            id: "05",
            title: "Setup",
            category: "Experiments",
            date: "2026-11-20",
          },
        ]}
      />
    );
    const category = screen.getByRole<HTMLSelectElement>("combobox", {
      name: "Category",
    });
    const order = screen.getByRole<HTMLSelectElement>("combobox", {
      name: "Sort books",
    });
    const search = screen.getByRole<HTMLInputElement>("searchbox");
    fireEvent.change(category, { target: { value: "Experiments" } });
    fireEvent.change(order, { target: { value: "newest" } });
    fireEvent.change(search, { target: { value: "notes" } });
    expect(titles()).toEqual(["Alpha notes", "Zeta notes", "Undated notes"]);

    fireEvent.click(screen.getByRole("button", { name: "Index" }));
    expect(category.value).toBe("Experiments");
    expect(order.value).toBe("newest");
    expect(search.value).toBe("notes");
    expect(titles()).toEqual(["Alpha notes", "Zeta notes", "Undated notes"]);

    fireEvent.change(category, { target: { value: "" } });
    expect(titles()).toEqual([
      "News notes",
      "Alpha notes",
      "Zeta notes",
      "Undated notes",
    ]);
    fireEvent.change(order, { target: { value: "default" } });
    expect(titles()).toEqual([
      "Alpha notes",
      "News notes",
      "Undated notes",
      "Zeta notes",
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Shelves" }));
    expect(titles()).toEqual([
      "Undated notes",
      "Zeta notes",
      "Alpha notes",
      "News notes",
    ]);
  });

  it.each([
    ["3 uncategorized books", 3, false, "shelf resting-shelf"],
    ["5 uncategorized books", 5, false, "shelf resting-shelf"],
    ["8 uncategorized books", 8, false, "shelf resting-shelf"],
    ["categorized books", 4, true, "shelf shelf-categorized"],
  ])(
    "uses uniform shelf classes without count-based size divergence for %s",
    (_label, count, categorized, expectedClass) => {
      const books: BookSummary[] = Array.from(
        { length: count },
        (_, index) => ({
          id: `book-${index + 1}`,
          title: `Book ${index + 1}`,
          ...(categorized
            ? { category: index < 2 ? "Guides" : "Reference" }
            : {}),
        })
      );
      const { container } = render(<Demo books={books} />);
      const shelf = container.querySelector(".shelf");
      expect(shelf).not.toBeNull();
      expect(shelf?.className).toBe(expectedClass);
      expect(shelf?.hasAttribute("data-mobile-rows")).toBe(false);
    }
  );
});
