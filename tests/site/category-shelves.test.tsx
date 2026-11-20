import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { useState } from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { readLibrary } from "../../cli/content.js";
import type { ShelfState } from "../../src/site/LibraryView";
import { copy, type Library } from "../../src/site/types";

function Bookshelf({
  View,
  library,
}: {
  View: typeof import("../../src/site/LibraryView").LibraryView;
  library: Library;
}): React.JSX.Element {
  const [state, onState] = useState<ShelfState>({
    mode: "shelves",
    query: "",
    category: "",
    newestFirst: false,
    scroll: 0,
    focus: "",
    shown: 12,
  });
  return (
    <View
      library={library}
      text={copy.en}
      state={state}
      onState={onState}
      onOpenVolume={() => {}}
    />
  );
}

describe("category shelf plates", () => {
  let source: string;
  let library: Library;
  let LibraryView: typeof import("../../src/site/LibraryView").LibraryView;
  const systemLabel = "データの構造と外部システム連携の開発者向けリファレンス";

  async function put(path: string, content: string): Promise<void> {
    const file = join(source, path);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, content);
  }

  beforeAll(async () => {
    class Observer {
      observe(): void {}
      disconnect(): void {}
    }
    vi.stubGlobal("IntersectionObserver", Observer);
    vi.stubGlobal("matchMedia", () => ({
      matches: true,
      addEventListener() {},
      removeEventListener() {},
    }));
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    ({ LibraryView } = await import("../../src/site/LibraryView"));
    source = await mkdtemp(join(tmpdir(), "grimoire-categories-"));
    await put(
      "docs/am-system/index.md",
      `---\ncategory: ${systemLabel}\n---\n# System Guide`
    );
    await put(
      "docs/am-system/data/index.md",
      `---\nbook: true\ncategory: ${systemLabel}\n---\n# Data Models`
    );
    await put(
      "docs/guide/index.md",
      "---\ncategory: Guides\n---\n# Getting Started"
    );
    await put(
      "docs/z-system/index.md",
      `---\ncategory: ${systemLabel}\n---\n# Integrations`
    );
    await put("docs/notes/index.md", "# Release Notes");
    const content = await readLibrary(source, { locale: "en" });
    library = content.manifest as Library;
  });

  afterAll(async () => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    await rm(source, { recursive: true, force: true });
  });

  it("groups a standalone book with its parent and retains the full category name", () => {
    render(<Bookshelf View={LibraryView} library={library} />);
    const grouped = within(screen.getByRole("region", { name: systemLabel }));
    expect(
      grouped.getByRole("heading", { name: systemLabel })
    ).toHaveTextContent(systemLabel);
    expect(
      grouped
        .getAllByRole("link")
        .map((link) => link.getAttribute("aria-label"))
    ).toEqual(["System Guide", "Data Models", "Integrations"]);
    expect(grouped.getByRole("link", { name: "Data Models" })).toHaveAttribute(
      "href",
      "#/_book-am-hsystem--data"
    );
    expect(
      within(screen.getByRole("region", { name: "Other books" })).getByRole(
        "link",
        { name: "Release Notes" }
      )
    ).toBeVisible();
  });

  it("keeps the chosen category when narrowing the shelf and switching to the index", () => {
    render(<Bookshelf View={LibraryView} library={library} />);
    fireEvent.change(screen.getByRole("combobox", { name: "Category" }), {
      target: { value: systemLabel },
    });
    expect(
      screen.queryByRole("region", { name: "Guides" })
    ).not.toBeInTheDocument();
    const filter = screen.getByRole("searchbox", { name: "Find a book" });
    fireEvent.change(filter, { target: { value: "data" } });
    expect(screen.getByRole("link", { name: "Data Models" })).toBeVisible();
    expect(
      screen.queryByRole("link", { name: "System Guide" })
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Index" }));
    expect(
      screen.queryByRole("heading", { name: systemLabel })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Data Models" })).toBeVisible();
  });
});
