function freezeVideos(
  article: HTMLElement,
  visibleArticle?: HTMLElement
): () => void {
  const visible = visibleArticle?.querySelectorAll("video");
  const stills = Array.from(
    article.querySelectorAll("video"),
    (video, index) => {
      const frame = visible?.[index] ?? video;
      const still = document.createElement("canvas");
      still.className = video.className;
      still.width = Math.max(1, video.clientWidth);
      still.height = Math.max(1, video.clientHeight);
      const context = still.getContext("2d");
      if (context && frame.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        // A remote player remains playable even when its pixels cannot be sampled.
        if (
          new URL(frame.currentSrc, document.baseURI).origin ===
          window.location.origin
        ) {
          context.drawImage(frame, 0, 0, still.width, still.height);
        }
      }
      video.replaceWith(still);
      return { video, still };
    }
  );
  return () => {
    for (const { video, still } of stills) still.replaceWith(video);
  };
}

function freezeTables(
  article: HTMLElement,
  visibleArticle?: HTMLElement
): () => void {
  const visible = visibleArticle?.querySelectorAll<HTMLElement>(".paper-table");
  const moved: HTMLElement[] = [];
  for (const [index, table] of Array.from(
    article.querySelectorAll<HTMLTableElement>(".paper-table > table")
  ).entries()) {
    const scroll = visible?.[index]?.scrollLeft || 0;
    if (!scroll) continue;
    // Preserve the reader's horizontal position while keeping the frozen column in place.
    table.style.translate = `${-scroll}px`;
    moved.push(table);
    for (const cell of table.querySelectorAll<HTMLElement>(
      "tr > :first-child"
    )) {
      cell.style.translate = `${scroll}px`;
      moved.push(cell);
    }
  }
  return () => {
    for (const element of moved) element.style.removeProperty("translate");
  };
}

function freezeDiagrams(
  article: HTMLElement,
  visibleArticle?: HTMLElement
): () => void {
  const selector = ".paper-diagram, .paper-diagram-source";
  const visible = visibleArticle?.querySelectorAll(selector);
  const copies: HTMLImageElement[] = [];
  for (const [index, pending] of Array.from(
    article.querySelectorAll(selector)
  ).entries()) {
    const diagram = visible?.[index];
    if (!(diagram instanceof HTMLImageElement)) continue;
    const copy = diagram.cloneNode();
    if (!(copy instanceof HTMLImageElement)) continue;
    // The visible image is ready even if the diagram in the hidden capture is still rendering.
    copy.classList.add("paper-diagram-copy");
    pending.parentNode?.insertBefore(copy, pending);
    copies.push(copy);
  }
  return () => {
    for (const copy of copies) copy.remove();
  };
}

export async function captureInk(
  article: HTMLElement,
  sheet: HTMLElement,
  stage: DOMRect,
  visibleArticle?: HTMLElement
): Promise<HTMLCanvasElement | null> {
  const { toCanvas } = await import("html-to-image");
  await document.fonts.ready;
  const restoreVideos = freezeVideos(article, visibleArticle);
  const restoreTables = freezeTables(article, visibleArticle);
  const restoreDiagrams = freezeDiagrams(article, visibleArticle);
  const rect = sheet.getBoundingClientRect();
  const source = await toCanvas(sheet, {
    pixelRatio: 1.4,
    skipFonts: true,
    style: {
      position: "relative",
      inset: "auto",
      overflow: "hidden",
      visibility: "visible",
      backgroundColor: "transparent",
    },
  }).finally(() => {
    restoreDiagrams();
    restoreTables();
    restoreVideos();
  });
  const canvas = document.createElement("canvas");
  const scale = Math.min(1.35, 2304 / stage.width, 1440 / stage.height);
  canvas.width = Math.round(stage.width * scale);
  canvas.height = Math.round(stage.height * scale);
  const ink = canvas.getContext("2d");
  if (!ink || !source.width) return null;
  ink.drawImage(
    source,
    ((rect.left - stage.left) / stage.width) * canvas.width,
    ((rect.top - stage.top) / stage.height) * canvas.height,
    (rect.width / stage.width) * canvas.width,
    (rect.height / stage.height) * canvas.height
  );
  return canvas;
}
