import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LibraryHallView } from "../../src/site/LibraryHallView";
import { copy, type LibraryHall } from "../../src/site/types";

describe("LibraryHallView", () => {
  const sampleHall: LibraryHall = {
    locale: "en",
    title: "Library Hall",
    description: "Choose a bookshelf to explore",
    footer: { label: "Back to Home", url: "/" },
    shelves: [
      {
        id: "product-docs",
        title: "Product Docs",
        description: "Guides, specs, and onboarding",
        href: "./product-docs/",
        books: [
          { id: "guides", title: "Guides", cover: "red" },
          { id: "specs", title: "Specs", cover: "green" },
          { id: "onboarding", title: "Onboarding", cover: "blue" },
        ],
      },
      {
        id: "architecture",
        title: "Architecture",
        description: "System design and runbooks",
        href: "./architecture/",
        books: [
          { id: "design", title: "Design", cover: "amber" },
          { id: "runbooks", title: "Runbooks", cover: "slate" },
        ],
      },
      {
        id: "release-notes",
        title: "Release Notes",
        description: "Changelogs and migration notes",
        href: "./release-notes/",
        books: [{ id: "v1", title: "v1.0", cover: "plum" }],
      },
    ],
  };

  it("renders each bookshelf alcove with brass plaque, preview books, description, and no book-count badge", () => {
    const { container } = render(
      <LibraryHallView hall={sampleHall} text={copy.en} />
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Library Hall" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Choose a bookshelf to explore")
    ).toBeInTheDocument();

    const productLink = screen.getByRole("link", { name: /Product Docs/ });
    expect(productLink).toHaveAttribute("href", "./product-docs/");
    expect(
      screen.getByText("Guides, specs, and onboarding")
    ).toBeInTheDocument();
    expect(screen.getByText("System design and runbooks")).toBeInTheDocument();
    expect(
      screen.getByText("Changelogs and migration notes")
    ).toBeInTheDocument();

    expect(container.querySelectorAll(".hall-shelf")).toHaveLength(3);
    expect(
      container.querySelectorAll('[data-shelf="product-docs"] .hall-book')
    ).toHaveLength(3);
    expect(
      container.querySelectorAll('[data-shelf="architecture"] .hall-book')
    ).toHaveLength(2);
    expect(
      container.querySelectorAll(
        '[data-shelf="release-notes"] .hall-book--solo'
      )
    ).toHaveLength(1);
    expect(container.textContent).not.toMatch(/\b\d+\s*books?\b/i);

    const homeLink = screen.getByRole("link", { name: "Back to Home" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders a localized empty state when no shelves are present", () => {
    render(
      <LibraryHallView
        hall={{ locale: "ja", title: "書庫", shelves: [] }}
        text={copy.ja}
      />
    );
    expect(
      screen.getByText("表示できる書架がありません。")
    ).toBeInTheDocument();
  });
});
