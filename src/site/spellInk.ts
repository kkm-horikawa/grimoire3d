interface PaperArea {
  article: HTMLElement;
  bounds: DOMRect;
  overlay: HTMLDivElement;
  running: Animation[];
  changed: HTMLElement[];
}

const duration = 860;

function visibleRects(element: HTMLElement, bounds: DOMRect): DOMRect[] {
  const range = document.createRange();
  range.selectNodeContents(element);
  return [...range.getClientRects()].filter(
    (rect) =>
      rect.width > 0 &&
      rect.height > 0 &&
      rect.bottom > bounds.top &&
      rect.top < bounds.bottom
  );
}

function effectBox(
  paper: PaperArea,
  rect: DOMRect,
  className: string
): HTMLSpanElement {
  const box = document.createElement("span");
  box.className = className;
  box.style.left = `${rect.left - paper.bounds.left}px`;
  box.style.top = `${rect.top - paper.bounds.top}px`;
  box.style.width = `${rect.width}px`;
  box.style.height = `${rect.height}px`;
  paper.overlay.append(box);
  return box;
}

function drawInk(
  paper: PaperArea,
  node: HTMLElement,
  kind: "mark" | "underline" | "cross"
): void {
  const rects = visibleRects(node, paper.bounds);
  if (!rects.length || rects.length > 6) return;
  node.classList.add(`spell-drawing-${kind}`);
  paper.changed.push(node);
  const time = duration / rects.length;
  const active = rects.flatMap((rect, index) => {
    const box = effectBox(paper, rect, `spell-ink spell-ink-${kind}`);
    const stroke = document.createElement("span");
    stroke.className = "spell-stroke";
    box.append(stroke);
    const timing = {
      delay: index * time,
      duration: time,
      fill: "both",
    } as const;
    const drawing = stroke.animate(
      [
        { transform: "scaleX(0)" },
        { transform: "scaleX(0)", offset: 0.12 },
        { transform: "scaleX(1)", offset: 0.84 },
        { transform: "scaleX(1)" },
      ],
      timing
    );
    if (kind === "underline") return [drawing];
    const tip = document.createElement("span");
    tip.className = kind === "mark" ? "spell-marker-tip" : "spell-ink-dust";
    box.append(tip);
    return [
      drawing,
      tip.animate(
        [
          { transform: "translate(0,-.45em)", opacity: 0 },
          { transform: "translateX(0)", opacity: 1, offset: 0.12 },
          {
            transform: `translateX(${rect.width}px)`,
            opacity: 1,
            offset: 0.84,
          },
          { transform: `translate(${rect.width}px,-.55em)`, opacity: 0 },
        ],
        timing
      ),
    ];
  });
  paper.running.push(...active);
  void Promise.allSettled(active.map((animation) => animation.finished)).then(
    () => {
      node.classList.remove(`spell-drawing-${kind}`);
      for (const animation of active) {
        if (
          animation.effect instanceof KeyframeEffect &&
          animation.effect.target instanceof Element
        ) {
          animation.effect.target.parentElement?.remove();
        }
      }
    }
  );
}

function raiseLetters(
  paper: PaperArea,
  node: HTMLElement,
  strong: boolean
): void {
  // Keep linked or mixed markup native while the printed text is selectable.
  if (node.childNodes.length !== 1 || !(node.firstChild instanceof Text))
    return;
  const text = node.firstChild;
  const letters = [...new Intl.Segmenter().segment(text.data)];
  if (!letters.length || letters.length > 46) return;
  const range = document.createRange();
  const font = getComputedStyle(node).font;
  const glyphs: { glyph: HTMLSpanElement; rect: DOMRect }[] = [];

  for (const { index, segment } of letters) {
    if (!segment.trim()) continue;
    range.setStart(text, index);
    range.setEnd(text, index + segment.length);
    const rect = range.getBoundingClientRect();
    if (
      !rect.width ||
      rect.bottom <= paper.bounds.top ||
      rect.top >= paper.bounds.bottom
    ) {
      for (const { glyph } of glyphs) glyph.remove();
      return;
    }
    const glyph = effectBox(paper, rect, "spell-letter");
    glyph.style.font = font;
    glyph.textContent = segment;
    glyphs.push({ glyph, rect });
  }
  if (!glyphs.length) return;
  // The range describes the printed glyph, while an absolutely positioned span
  // starts from its line box. Match the printed baseline before moving it.
  const offsets = glyphs.map(({ glyph, rect }) => {
    range.selectNodeContents(glyph);
    const copy = range.getBoundingClientRect();
    return {
      glyph,
      left: rect.left - paper.bounds.left + rect.left - copy.left,
      top: rect.top - paper.bounds.top + rect.top - copy.top,
    };
  });
  for (const { glyph, left, top } of offsets) {
    glyph.style.left = `${left}px`;
    glyph.style.top = `${top}px`;
  }
  node.classList.add("spell-letters-rising");
  paper.changed.push(node);
  const animations = glyphs.map(({ glyph }, index) =>
    glyph.animate(
      [
        { transform: "translateY(0)" },
        {
          transform: `translate(${strong ? ((index % 3) - 1) * 0.4 : 0}em,${strong ? -0.9 - (index % 2) * 0.35 : -0.38}em) rotate(${index % 2 ? 9 : -7}deg)`,
          offset: 0.48,
        },
        { transform: "translateY(0)" },
      ],
      {
        duration: strong ? 810 : 520,
        delay: Math.min(index * 38, 250),
        easing: "ease-in-out",
        fill: "both",
      }
    )
  );
  paper.running.push(...animations);
  void Promise.allSettled(
    animations.map((animation) => animation.finished)
  ).then(() => {
    node.classList.remove("spell-letters-rising");
    for (const { glyph } of glyphs) glyph.remove();
  });
}

function simpleEffect(paper: PaperArea, node: HTMLElement): void {
  if (node.matches(".paper-alert")) {
    const seal = effectBox(paper, node.getBoundingClientRect(), "spell-seal");
    seal.textContent = "!";
    paper.running.push(
      seal.animate(
        [
          {
            transform: "translateY(-1em) scale(1.5) rotate(-18deg)",
            opacity: 0,
          },
          { transform: "scale(1)", opacity: 1, offset: 0.45 },
          { transform: "scale(1)", opacity: 0 },
        ],
        { duration: 920, fill: "both" }
      )
    );
    return;
  }
  if (node.matches(".paper-red")) {
    const drop = effectBox(
      paper,
      node.getBoundingClientRect(),
      "spell-red-drop"
    );
    paper.running.push(
      drop.animate(
        [
          { transform: "translateY(-.9em)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1, offset: 0.54 },
          { transform: "translateY(.22em) scale(1.35,.45)", opacity: 0 },
        ],
        { duration: 680, fill: "both" }
      )
    );
    return;
  }
  if (node.matches("code")) {
    if (node.closest("pre")) return;
    const frame = effectBox(
      paper,
      node.getBoundingClientRect(),
      "spell-code-frame"
    );
    const left = document.createElement("span");
    const right = document.createElement("span");
    left.textContent = "[";
    right.textContent = "]";
    frame.append(left, right);
    for (const [index, end] of [left, right].entries()) {
      paper.running.push(
        end.animate(
          [
            { transform: `translateX(${index ? 0.8 : -0.8}em)`, opacity: 0 },
            { transform: "translateX(0)", opacity: 0.7, offset: 0.62 },
            { transform: "translateX(0)", opacity: 0 },
          ],
          { duration: 790, fill: "both" }
        )
      );
    }
    return;
  }
  const diagram = node.classList.contains("paper-diagram");
  const motion = diagram
    ? [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0)" }]
    : [
        {
          opacity: 0.78,
          textShadow: "0 .17em .08em #5639235c",
        },
        {
          opacity: 1,
          textShadow: "none",
        },
      ];
  paper.running.push(
    node.animate(motion, { duration: 660, easing: "ease-out" })
  );
}

export function playSpellInk(stage: HTMLElement): () => void {
  const cleanups: (() => void)[] = [];
  for (const article of stage.querySelectorAll<HTMLElement>(
    ":scope > .book-sheet .page-text"
  )) {
    const overlay = document.createElement("div");
    overlay.className = "spell-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.insetInlineStart = `${article.scrollLeft}px`;
    overlay.style.insetBlockStart = `${article.scrollTop}px`;
    overlay.style.width = `${article.clientWidth}px`;
    overlay.style.height = `${article.clientHeight}px`;
    article.append(overlay);
    const paper: PaperArea = {
      article,
      bounds: article.getBoundingClientRect(),
      overlay,
      running: [],
      changed: [],
    };
    const nodes = article.querySelectorAll<HTMLElement>(
      "mark,u,del,strong,em,h1,h2,h3,code,.paper-red,.paper-alert,.paper-diagram"
    );
    for (const node of [...nodes].slice(0, 24)) {
      const rect = node.getBoundingClientRect();
      if (rect.bottom < paper.bounds.top || rect.top > paper.bounds.bottom)
        continue;
      if (node.matches("mark,u,del")) {
        drawInk(
          paper,
          node,
          node.matches("mark")
            ? "mark"
            : node.matches("u")
              ? "underline"
              : "cross"
        );
      } else if (node.matches("strong,em")) {
        raiseLetters(paper, node, node.matches("strong"));
      } else {
        simpleEffect(paper, node);
      }
    }
    if (!paper.running.length) {
      overlay.remove();
      continue;
    }
    let finished = false;
    const cleanup = (): void => {
      if (finished) return;
      finished = true;
      article.removeEventListener("scroll", cleanup);
      window.removeEventListener("resize", cleanup);
      for (const animation of paper.running) animation.cancel();
      for (const node of paper.changed) {
        node.classList.remove(
          "spell-drawing-mark",
          "spell-drawing-underline",
          "spell-drawing-cross",
          "spell-letters-rising"
        );
      }
      overlay.remove();
    };
    article.addEventListener("scroll", cleanup, { passive: true });
    window.addEventListener("resize", cleanup);
    cleanups.push(cleanup);
    void Promise.allSettled(
      paper.running.map((animation) => animation.finished)
    ).then(cleanup);
  }
  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}
