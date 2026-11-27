import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BookReader, layoutOffsetTop } from "../../src/site/BookReader";
import { type Book, copy, type Library } from "../../src/site/types";

vi.hoisted(() => {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
});

beforeEach(() => {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)",
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
});

const book: Book = {
  id: "ubuntu-guide",
  title: "Ubuntu Guide",
  pages: [
    {
      id: "index",
      title: "Ubuntu Guide",
      section: { id: "overview", title: "Overview" },
      markdown: "# Ubuntu Guide\n\n## Overview\n\nCover text.",
      preparedHtml:
        '<h1 id="ubuntu-guide">Ubuntu Guide</h1><h2 id="overview">Overview</h2><p>Cover text.</p>',
      links: {},
    },
    {
      id: "why-ubuntu",
      title: "Why Ubuntu",
      section: { id: "first-step", title: "First Step" },
      markdown: "# Why Ubuntu\n\n## First Step\n\nChapter intro.",
      preparedHtml:
        '<h1 id="why-ubuntu">Why Ubuntu</h1><h2 id="first-step">First Step</h2><p>Chapter intro.</p>',
      links: {},
    },
    {
      id: "why-ubuntu",
      title: "Why Ubuntu",
      section: { id: "next-step", title: "Next Step" },
      markdown: "## Next Step\n\nSecond sheet.",
      preparedHtml: '<h2 id="next-step">Next Step</h2><p>Second sheet.</p>',
      links: {},
    },
  ],
};

const library: Library = {
  title: "Shelf",
  locale: "ja",
  shelf: true,
  books: [{ id: book.id, title: book.title }],
};

describe("BookReader mobile page-turn and anchor scroll", () => {
  it("keeps chapter-opening page turns free of the first h2 anchor", () => {
    const { rerender } = render(
      <BookReader
        library={library}
        text={copy.ja}
        book={book}
        pageId="index"
        anchor={null}
      />
    );
    expect(
      screen.getByRole("link", { name: copy.ja.next }).getAttribute("href")
    ).toBe("#/ubuntu-guide/why-ubuntu");

    rerender(
      <BookReader
        library={library}
        text={copy.ja}
        book={book}
        pageId="why-ubuntu"
        anchor={null}
      />
    );
    expect(
      screen.getByRole("link", { name: copy.ja.previous }).getAttribute("href")
    ).toBe("#/ubuntu-guide");
    expect(
      screen.getByRole("link", { name: copy.ja.next }).getAttribute("href")
    ).toBe("#/ubuntu-guide/why-ubuntu?anchor=next-step");

    rerender(
      <BookReader
        library={library}
        text={copy.ja}
        book={book}
        pageId="why-ubuntu"
        anchor="next-step"
      />
    );
    expect(
      screen.getByRole("link", { name: copy.ja.previous }).getAttribute("href")
    ).toBe("#/ubuntu-guide/why-ubuntu");
  });

  it("computes anchor scroll offset in layout coordinates unaffected by transforms", () => {
    const sheet = document.createElement("div");
    const article = document.createElement("article");
    const section = document.createElement("div");
    const heading = document.createElement("h2");
    sheet.append(article);
    article.append(section);
    section.append(heading);

    Object.defineProperty(sheet, "offsetTop", { value: 40 });
    Object.defineProperty(sheet, "clientTop", { value: 0 });
    Object.defineProperty(article, "offsetParent", { value: sheet });
    Object.defineProperty(article, "offsetTop", { value: 12 });
    Object.defineProperty(article, "clientTop", { value: 2 });
    Object.defineProperty(section, "offsetParent", { value: article });
    Object.defineProperty(section, "offsetTop", { value: 30 });
    Object.defineProperty(section, "clientTop", { value: 1 });
    Object.defineProperty(heading, "offsetParent", { value: section });
    Object.defineProperty(heading, "offsetTop", { value: 120 });

    // Even if a 3D transform stretches getBoundingClientRect(), layoutOffsetTop stays exact.
    article.getBoundingClientRect = () => new DOMRect(0, 100, 300, 500);
    heading.getBoundingClientRect = () => new DOMRect(0, 272, 300, 32);

    expect(layoutOffsetTop(heading, article)).toBe(151);
  });
});
