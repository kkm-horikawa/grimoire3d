import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { readLibrary } from "../../cli/content.js";
import { type Book, copy, type Library } from "../../src/site/types";

describe("opt-in full-text search", () => {
  let source: string;
  let library: Awaited<ReturnType<typeof readLibrary>>;
  let SearchControl: typeof import("../../src/site/SearchControl").SearchControl;
  let BookReader: typeof import("../../src/site/BookReader").BookReader;
  let wide = false;

  async function add(path: string, content: string): Promise<void> {
    const filename = join(source, path);
    await mkdir(dirname(filename), { recursive: true });
    await writeFile(filename, content);
  }

  beforeAll(async () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query.includes("min-width") ? wide : true,
      addEventListener() {},
      removeEventListener() {},
    }));
    const viewport = Object.assign(new EventTarget(), { height: 560 });
    vi.stubGlobal("visualViewport", viewport);
    Object.defineProperties(HTMLDialogElement.prototype, {
      showModal: {
        configurable: true,
        value(this: HTMLDialogElement) {
          this.open = true;
        },
      },
      close: {
        configurable: true,
        value(this: HTMLDialogElement) {
          this.open = false;
          this.dispatchEvent(new Event("close"));
        },
      },
    });
    ({ SearchControl } = await import("../../src/site/SearchControl"));
    ({ BookReader } = await import("../../src/site/BookReader"));
    source = await mkdtemp(join(tmpdir(), "grimoire-search-"));
    await add(
      "docs/guide/index.md",
      "# Guide\n\nIntro text.\n\n## 設定\n\nキャッシュは設定で管理します。"
    );
    await add(
      "docs/reference/index.md",
      "# Reference\n\n## Limits\n\nThe limit is 18."
    );
    await Promise.all(
      Array.from({ length: 32 }, (_, index) =>
        add(
          `docs/reference/section-${index}.md`,
          `# Step ${index}\n\nThe limit is 18.`
        )
      )
    );
    library = await readLibrary(source, { locale: "en" });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    history.replaceState(null, "", "/");
  });

  afterAll(async () => {
    vi.unstubAllGlobals();
    await rm(source, { force: true, recursive: true });
  });

  function mockIndex(): ReturnType<typeof vi.spyOn> {
    return vi.spyOn(globalThis, "fetch").mockImplementation(async (input) => {
      const path = new URL(String(input)).pathname;
      if (path === "/search/library.json")
        return new Response(JSON.stringify(library.searchBooks));
      if (path === "/search/books/guide.json")
        return new Response(
          JSON.stringify(
            library.searchBooks.filter((book) => book.id === "guide")
          )
        );
      return new Response(null, { status: 404 });
    });
  }

  it("fetches the library index on demand and opens a matching Japanese heading", async () => {
    const requests = mockIndex();
    render(<SearchControl text={copy.en} />);
    expect(requests).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Search text" }));
    const dialog = within(
      await screen.findByRole("dialog", { name: "Search library" })
    );
    const field = dialog.getByRole("searchbox");
    fireEvent.change(field, { target: { value: "キャッシュ" } });
    const result = await dialog.findByRole("link", { name: /設定/ });
    expect(result.querySelector("mark")).toHaveTextContent("キャッシュ");
    expect(requests.mock.calls[0][0]).toMatch(/\/search\/library.json$/);
    fireEvent.keyDown(field, { key: "ArrowDown" });
    expect(result).toHaveFocus();
    fireEvent.click(result);
    expect(decodeURIComponent(location.hash)).toBe("#/guide/index?anchor=設定");
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("uses only the current book's index, reports a miss, and restores focus on Escape", async () => {
    const requests = mockIndex();
    render(
      <SearchControl book={{ id: "guide", title: "Guide" }} text={copy.ja} />
    );
    const trigger = screen.getByRole("button", { name: "この本を検索" });
    fireEvent.click(trigger);
    const dialog = within(
      await screen.findByRole("dialog", { name: "この本を検索" })
    );
    const field = dialog.getByRole("searchbox");
    expect(dialog.getByText("Guide")).toBeVisible();
    fireEvent.change(field, { target: { value: "limit" } });
    expect(await dialog.findByText("0 件")).toBeVisible();
    expect(dialog.queryByRole("link")).not.toBeInTheDocument();
    expect(requests.mock.calls[0][0]).toMatch(/\/search\/books\/guide.json$/);
    fireEvent.keyDown(field, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
    expect(trigger).toHaveFocus();
  });

  it("shows more matches on demand and closes from the toolbar", async () => {
    mockIndex();
    render(<SearchControl text={copy.en} />);
    fireEvent.click(screen.getByRole("button", { name: "Search text" }));
    const dialog = within(await screen.findByRole("dialog"));
    fireEvent.change(dialog.getByRole("searchbox"), {
      target: { value: "limit" },
    });
    const more = await dialog.findByRole("button", {
      name: "Show more results",
    });
    expect(dialog.getAllByRole("link")).toHaveLength(30);
    fireEvent.click(more);
    expect(dialog.getAllByRole("link")).toHaveLength(33);
    fireEvent.click(dialog.getByRole("button", { name: "Close" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("reports a failed search request", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 503 })
    );
    render(<SearchControl text={copy.en} />);
    fireEvent.click(screen.getByRole("button", { name: "Search text" }));
    expect(
      await screen.findByText("Search could not load. Close it and try again.")
    ).toBeVisible();
  });

  it.each([false, true])(
    "puts reader search on the correct side of Contents (wide=%s)",
    (desktop) => {
      wide = desktop;
      const manifest = { ...library.manifest, magicMode: true } as Library;
      const book = {
        ...library.books[0],
        pages: [
          {
            id: "index",
            title: "Guide",
            markdown: "# Guide",
            preparedHtml: "<h1>Guide</h1>",
            links: {},
          },
        ],
      } as Book;
      render(
        <BookReader
          library={manifest}
          book={book}
          text={copy.en}
          pageId="index"
          anchor={null}
        />
      );
      const search = screen.getByRole("button", { name: "Search this book" });
      const contents = screen.getByRole("button", { name: "Contents" });
      const beforeContents = Boolean(
        search.compareDocumentPosition(contents) &
          Node.DOCUMENT_POSITION_FOLLOWING
      );
      expect(beforeContents).toBe(!desktop);
    }
  );
});
