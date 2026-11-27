import { beforeAll, describe, expect, it, vi } from "vitest";
import { readerPath } from "../../cli/routes.js";
import { chapterPageIndex, type Page } from "../../src/site/types";

describe("canonical book opening routes", () => {
  let bookHref: typeof import("../../src/site/navigation").bookHref;
  let resolveHref: typeof import("../../src/site/navigation").resolveHref;

  beforeAll(async () => {
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      addEventListener() {},
      removeEventListener() {},
    }));
    const nav = await import("../../src/site/navigation");
    bookHref = nav.bookHref;
    resolveHref = nav.resolveHref;
  });

  it("omits /index/ from readerPath for the book root index chapter", () => {
    expect(readerPath("start")).toBe("read/start/");
    expect(readerPath("start", undefined)).toBe("read/start/");
    expect(readerPath("start", "index")).toBe("read/start/");
    expect(readerPath("start", "first-book")).toBe("read/start/first-book/");
    expect(readerPath("start", "part/index")).toBe("read/start/part/index/");
  });

  it("canonicalizes preview hash links for index chapters to the book root", () => {
    expect(bookHref("start")).toBe("#/start");
    expect(bookHref("start", "index")).toBe("#/start");
    expect(bookHref("start", "index", "install")).toBe(
      "#/start?anchor=install"
    );
    expect(bookHref("start", "first-book")).toBe("#/start/first-book");
    expect(bookHref("start", "first-book", "setup")).toBe(
      "#/start/first-book?anchor=setup"
    );
    expect(resolveHref("#/start/index")).toBe("#/start");
    expect(resolveHref("#/start/index?anchor=install")).toBe(
      "#/start?anchor=install"
    );
  });

  it("resolves anchors inside the opening chapter when page id is omitted", () => {
    const pages: Page[] = [
      {
        id: "index",
        title: "Cover",
        markdown: "# Cover",
        links: {},
        headingIds: { 0: "cover" },
      },
      {
        id: "index",
        title: "Cover",
        markdown: "## Quick install",
        links: {},
        section: { id: "quick-install", title: "Quick install" },
        headingIds: { 0: "quick-install" },
      },
      {
        id: "guide",
        title: "Guide",
        markdown: "# Guide",
        links: {},
        headingIds: { 0: "guide" },
      },
    ];

    expect(chapterPageIndex(pages, undefined, null)).toBe(0);
    expect(chapterPageIndex(pages, undefined, "quick-install")).toBe(1);
    expect(chapterPageIndex(pages, "index", "quick-install")).toBe(1);
    expect(chapterPageIndex(pages, "guide", null)).toBe(2);
  });
});
