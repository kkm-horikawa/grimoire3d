import { expect, it, vi } from "vitest";
import { playSpellInk } from "../../src/site/spellInk";

it("draws inline decorations and removes them when the reader leaves the page", () => {
  const stage = document.createElement("div");
  stage.innerHTML = `
    <div class="book-sheet">
      <article class="page-text">
        <mark>Marked</mark> <u>Underlined</u> <del>Crossed out</del>
        <code>Inline</code><pre><code>Block</code></pre>
        <div class="paper-diagram">Diagram</div>
      </article>
    </div>`;
  const bounds = new DOMRect(0, 0, 100, 100);
  const range = document.createRange();
  Object.defineProperty(range, "getClientRects", {
    value: () => [new DOMRect(10, 10, 60, 20)],
  });
  vi.spyOn(document, "createRange").mockReturnValue(range);
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(bounds);

  // jsdom provides no Web Animations. Keep them pending until the page exits.
  const animate = Object.getOwnPropertyDescriptor(Element.prototype, "animate");
  Object.defineProperty(Element.prototype, "animate", {
    configurable: true,
    value: () => ({ finished: new Promise(() => {}), cancel: vi.fn() }),
  });

  try {
    const leavePage = playSpellInk(stage);
    expect(stage.querySelector(".spell-ink-mark")).not.toBeNull();
    expect(stage.querySelector(".spell-ink-underline")).not.toBeNull();
    expect(stage.querySelector(".spell-ink-cross")).not.toBeNull();
    expect(stage.querySelectorAll(".spell-code-frame")).toHaveLength(1);

    leavePage();
    expect(stage.querySelector(".spell-overlay")).toBeNull();
    expect(stage.querySelector("[class*=spell-drawing]")).toBeNull();
  } finally {
    if (animate) {
      Object.defineProperty(Element.prototype, "animate", animate);
    } else {
      Reflect.deleteProperty(Element.prototype, "animate");
    }
    vi.restoreAllMocks();
  }
});
