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

export interface HallBookPreview {
  id: string;
  title: string;
  cover?: string;
}

export interface HallShelf {
  id: string;
  title: string;
  description?: string;
  href: string;
  books: HallBookPreview[];
}

export interface LibraryHall {
  title: string;
  description?: string;
  locale: Locale;
  siteUrl?: string;
  author?: string;
  footer?: LibraryPublisher;
  shelves: HallShelf[];
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

export interface Appendix {
  title: string;
  href: string;
}

export interface Book extends BookSummary {
  pages: Page[];
  appendices?: Appendix[];
}

export const copy = {
  en: {
    library: "Library",
    shelves: "Shelves",
    index: "Index",
    find: "Find a book",
    searchText: "Search text",
    searchLibrary: "Search library",
    searchBook: "Search this book",
    searchQuery: "Search text",
    searchLoading: "Loading search…",
    searchUnavailable: "Search could not load. Close it and try again.",
    searchResults: (count: number) =>
      `${count} ${count === 1 ? "result" : "results"}`,
    searchMore: "Show more results",
    category: "Category",
    allCategories: "All categories",
    otherBooks: "Other books",
    sort: "Sort books",
    defaultOrder: "Default order",
    newestFirst: "Newest first",
    clear: "Clear search",
    zero: "No books found",
    count: (count: number) => `${count} ${count === 1 ? "book" : "books"}`,
    matches: (count: number) =>
      `${count} ${count === 1 ? "book" : "books"} found`,
    contents: "Contents",
    appendix: "Appendix",
    appendices: "Appendices",
    opensInNewTab: "Opens in a new tab",
    scrollableTable: "Horizontally scrollable table",
    loadVideo: "Load video",
    openVideo: "Open video on its site",
    diagram: "Mermaid diagram",
    image: "Image",
    imageExpand: (label: string) => `Enlarge ${label}`,
    imagePan: "Image, drag or use arrow keys to pan",
    imageFit: "Fit image to viewport",
    fit: "Fit",
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
    hallEmpty: "No bookshelves are available.",
    hallUnavailable: "Bookshelves could not be loaded.",
  },
  ja: {
    library: "書架",
    shelves: "書架",
    index: "目録",
    find: "本を探す",
    searchText: "本文検索",
    searchLibrary: "書架を検索",
    searchBook: "この本を検索",
    searchQuery: "キーワードを入力",
    searchLoading: "検索を読み込み中…",
    searchUnavailable:
      "検索を読み込めませんでした。閉じてからもう一度お試しください。",
    searchResults: (count: number) => `${count} 件`,
    searchMore: "もっと表示",
    category: "カテゴリ",
    allCategories: "すべてのカテゴリ",
    otherBooks: "その他の本",
    sort: "並び順",
    defaultOrder: "既定順",
    newestFirst: "公開日が新しい順",
    clear: "検索をクリア",
    zero: "一致する本がありません",
    count: (count: number) => `${count} 冊`,
    matches: (count: number) => `${count} 冊見つかりました`,
    contents: "目次",
    appendix: "付録",
    appendices: "付録",
    opensInNewTab: "新しいタブで開く",
    scrollableTable: "横にスクロールできる表",
    loadVideo: "動画を読み込む",
    openVideo: "動画サイトで開く",
    diagram: "Mermaid 図",
    image: "画像",
    imageExpand: (label: string) => `${label}を拡大表示`,
    imagePan: "画像。ドラッグまたは矢印キーで移動",
    imageFit: "画像を画面に合わせる",
    fit: "全体",
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
    hallEmpty: "表示できる書架がありません。",
    hallUnavailable: "書架一覧を読み込めませんでした。",
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
  const resolvedId = id ?? pages[0]?.id;
  const chapter = pages.findIndex((page) => page.id === resolvedId);
  if (chapter < 0) return 0;
  if (anchor) {
    for (let index = chapter; index < pages.length; index += 1) {
      const page = pages[index];
      if (!page || page.id !== resolvedId) break;
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
