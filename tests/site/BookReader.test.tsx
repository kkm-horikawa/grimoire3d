import { fireEvent, render, screen } from "@testing-library/react";
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

describe("BookReader PDF appendices", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function (
      this: HTMLDialogElement
    ) {
      this.open = true;
    });
    HTMLDialogElement.prototype.close = vi.fn(function (
      this: HTMLDialogElement
    ) {
      this.open = false;
      this.dispatchEvent(new Event("close"));
    });
    Element.prototype.scrollIntoView = vi.fn();
  });

  const bookWithAppendices: Book = {
    ...book,
    appendices: [
      {
        title: "Observation worksheet",
        href: "./content/field-notes/assets/observation-sheet.pdf",
      },
      {
        title: "Equipment checklist",
        href: "./content/field-notes/assets/checklist.pdf",
      },
    ],
  };

  it("omits the bookmark and Appendices section when a book has zero appendices", () => {
    render(
      <BookReader
        library={{ ...library, locale: "en" }}
        text={copy.en}
        book={book}
        pageId="index"
        anchor={null}
      />
    );

    expect(
      screen.queryByRole("button", { name: copy.en.appendix })
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: copy.en.contents }));
    expect(
      screen.queryByRole("heading", { name: copy.en.appendices })
    ).not.toBeInTheDocument();
  });

  it("opens Contents scrolled to Appendices from the bookmark and restores focus and scroll on close", () => {
    const raf = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      });
    try {
      const { container } = render(
        <BookReader
          library={{ ...library, locale: "en" }}
          text={copy.en}
          book={bookWithAppendices}
          pageId="why-ubuntu"
          anchor={null}
        />
      );

      const article = container.querySelector<HTMLElement>(
        '.book-sheet[data-sheet="right"] .page-text'
      );
      expect(article).not.toBeNull();
      if (article) article.scrollTop = 145;

      const bookmark = screen.getByRole("button", { name: copy.en.appendix });
      fireEvent.click(bookmark);

      const appendicesHeading = screen.getByRole("heading", {
        name: copy.en.appendices,
      });
      expect(appendicesHeading).toBeInTheDocument();
      const scrollSpy = vi.mocked(Element.prototype.scrollIntoView);
      expect(scrollSpy).toHaveBeenCalledWith({ block: "start" });

      const links = screen
        .getAllByRole("link")
        .filter((link) => link.classList.contains("catalog-appendix-link"));
      expect(
        links.map(
          (link) => link.querySelector(".catalog-appendix-title")?.textContent
        )
      ).toEqual(["Observation worksheet", "Equipment checklist"]);
      for (const link of links) {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
        expect(link.textContent).toContain("PDF");
        expect(link.textContent).toContain(copy.en.opensInNewTab);
      }
      expect(links[0].getAttribute("href")).toContain(
        "/content/field-notes/assets/observation-sheet.pdf"
      );

      // Simulate scroll perturbation while Contents is open, then close Contents.
      if (article) article.scrollTop = 0;
      fireEvent.click(screen.getByRole("button", { name: copy.en.close }));

      expect(document.activeElement).toBe(bookmark);
      expect(article?.scrollTop).toBe(145);

      // Opening from Contents restores focus to the Contents button instead.
      const contentsBtn = screen.getByRole("button", {
        name: copy.en.contents,
      });
      fireEvent.click(contentsBtn);
      fireEvent.click(screen.getByRole("button", { name: copy.en.close }));
      expect(document.activeElement).toBe(contentsBtn);
    } finally {
      raf.mockRestore();
    }
  });

  it("renders the Japanese bookmark inside the reading stage on desktop viewports", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches:
        query === "(prefers-reduced-motion: reduce)" ||
        query === "(min-width: 700px)",
      addEventListener: () => {},
      removeEventListener: () => {},
    }));

    const { container } = render(
      <BookReader
        library={library}
        text={copy.ja}
        book={bookWithAppendices}
        pageId="index"
        anchor={null}
      />
    );

    const bookmark = screen.getByRole("button", { name: copy.ja.appendix });
    expect(bookmark.closest(".reader-stage")).not.toBeNull();
    expect(
      container.querySelector(".reader-header .appendix-bookmark")
    ).toBeNull();
  });
});
