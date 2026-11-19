import type { LibraryPublisher } from "../../cli/library-footer";

export type Locale = "en" | "ja";

export interface BookSummary {
  id: string;
  title: string;
  cover?: string;
  coverImage?: string;
  category?: string;
  date?: string;
}

export interface Library {
  title: string;
  locale: Locale;
  shelf: boolean;
  magicMode?: boolean;
  siteUrl?: string;
  footer?: LibraryPublisher;
  books: BookSummary[];
}

export interface Section {
  id: string;
  title: string;
}

export interface Page {
  id: string;
  title: string;
  group?: string;
  section?: Section;
  headingIds?: Record<number, string>;
  markdown: string;
  preparedHtml?: string;
  links: Record<string, string>;
}

export interface Book extends BookSummary {
  pages: Page[];
}

export const copy = {
  en: {
    library: "Library",
    shelves: "Shelves",
    index: "Index",
    find: "Find a book",
    category: "Category",
    allCategories: "All categories",
    sort: "Sort books",
    defaultOrder: "Default order",
    newestFirst: "Newest first",
    clear: "Clear search",
    zero: "No books found",
    count: (count: number) => `${count} ${count === 1 ? "book" : "books"}`,
    matches: (count: number) =>
      `${count} ${count === 1 ? "book" : "books"} found`,
    contents: "Contents",
    scrollableTable: "Horizontally scrollable table",
    loadVideo: "Load video",
    openVideo: "Open video on its site",
    diagram: "Mermaid diagram",
    diagramExpand: "Open enlarged diagram",
    diagramPan: "Diagram, drag or use arrow keys to pan",
    diagramFit: "Fit diagram to viewport",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    diagramError: "This diagram could not be rendered.",
    magic: "Spell mode",
    cover: "Cover",
    chapterPages: (chapter: string) => `${chapter} pages`,
    previous: "Previous page",
    next: "Next page",
    close: "Close",
    unavailable: "This page could not be opened.",
    loading: "Opening…",
  },
  ja: {
    library: "書架",
    shelves: "書架",
    index: "目録",
    find: "本を探す",
    category: "カテゴリ",
    allCategories: "すべてのカテゴリ",
    sort: "並び順",
    defaultOrder: "既定順",
    newestFirst: "公開日が新しい順",
    clear: "検索をクリア",
    zero: "一致する本がありません",
    count: (count: number) => `${count} 冊`,
    matches: (count: number) => `${count} 冊見つかりました`,
    contents: "目次",
    scrollableTable: "横にスクロールできる表",
    loadVideo: "動画を読み込む",
    openVideo: "動画サイトで開く",
    diagram: "Mermaid 図",
    diagramExpand: "図を拡大表示",
    diagramPan: "図。ドラッグまたは矢印キーで移動",
    diagramFit: "図を画面に合わせる",
    zoomIn: "拡大",
    zoomOut: "縮小",
    diagramError: "図を表示できませんでした。",
    magic: "超魔導",
    cover: "表紙",
    chapterPages: (chapter: string) => `${chapter}のページ`,
    previous: "前のページ",
    next: "次のページ",
    close: "閉じる",
    unavailable: "ページを開けませんでした。",
    loading: "読み込み中…",
  },
} as const;

export type Copy = (typeof copy)[Locale];

export function pageKey(page: Page): string {
  const chapter = encodeURIComponent(page.id);
  return page.section
    ? `${chapter}#${encodeURIComponent(page.section.id)}`
    : chapter;
}

export function chapterPageIndex(
  pages: Page[],
  id: string | undefined,
  anchor: string | null
): number {
  const chapter = pages.findIndex((page) => page.id === id);
  if (chapter < 0) return 0;
  if (anchor) {
    for (let index = chapter; index < pages.length; index += 1) {
      const page = pages[index];
      if (!page || page.id !== id) break;
      if (
        page.section?.id === anchor ||
        Object.values(page.headingIds ?? {}).includes(anchor)
      ) {
        return index;
      }
    }
  }
  return chapter;
}
