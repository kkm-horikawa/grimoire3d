---
cover: green
description: Organize Markdown files into books with chapters, sections, and stable links.
chapters: [formatting.md, media.md]
---
# Writing Books

A folder directly under `docs/` becomes a book. Each Markdown file in that book is a chapter.

```text
docs/
├── field-notes/
│   ├── index.md
│   └── 01-setup.md
└── release-notes/
    ├── index.md
    ├── v1.4.md
    └── v1.5.md
```

`docs` 直下のフォルダがそれぞれ1冊、その中のMarkdownが章になります。`docs` 直下のMarkdownはまとめて別の1冊になります。入れ子のフォルダは同じ本の章グループで、各 `index.md` がグループの導入です。

```text
docs/
├── index.md              # docs直下のMarkdownで1冊
├── notes.md
└── handbook/             # 別の1冊
    ├── index.md          # 本の導入
    ├── setup.md
    └── examples/         # handbook内のグループ
        ├── index.md      # グループの導入
        └── cli.md
```

本が7冊以上あるとタイトル検索が表示されます。カテゴリーまたは公開日を設定した本があれば、6冊以下でも検索欄を表示します。

## Chapters and sections

`index.md` は各フォルダの先頭です。続く順番は、その `index.md` のYAMLで指定できます。

```yaml
chapters:
  - setup.md
  - examples/
  - reference.md
```

指定した章・フォルダを先に並べ、未指定の項目は後ろにファイル名の自然順（`2` → `10`）で追加します。`chapters` を省略しても自然順です。フォルダ内は子の `index.md` に従います。対象は同じフォルダの直下だけで、別の本を取り込む指定はできません。存在しない項目・重複・直下以外のパスは、該当する `index.md` を示してビルドを止めます。ファイル名と章のURLは変わりません。

Use H1 for the chapter title. An H2 opens a new page. When the first H2 immediately follows the chapter title, they share the first page. Use H3 for subheadings within a page. The table of contents groups H2 sections and their page numbers under each chapter.

## Titles, links, and covers

The H1 in the book's `index.md` names the book. Keep your paths in English and write titles in your readers' language. Set `locale: ja` in `grimoire.yml` to display the reader controls in Japanese.

Link to other chapters with relative Markdown paths and an optional heading anchor. For example, `[Drawings](./media.md#mermaid-diagrams)` opens [the Mermaid section](./media.md#mermaid-diagrams). You can also copy a chapter or section URL directly from the reader.

Set the cover in the book's `index.md` front matter. Available covers are `red`, `green`, `blue`, `plum`, `amber`, `teal`, `black`, `ivory`, `walnut`, and `slate`. Books without a cover setting use a color based on their folder path.

```markdown
---
cover: teal
---
# Release Notes
```

## Categories and publication dates

Use the book's `index.md` front matter to group it with related books or give it a publication date.

```markdown
---
category: Experiments
date: "2026-11-19"
---
# Field Notes
```

Both fields are optional. Use any category name and a date in `YYYY-MM-DD` format. The category selector appears if at least one book has a category. The sort selector appears if at least one book has a publication date.

The selectors work with title search and carry across Shelves and Index. **Newest first** lists dated books first, with same-day books in title order and undated books at the end. **Default order** restores folder order on the shelves and title order in the index. Chapter order comes from the files in each book.

## Custom cover artwork

Set `coverImage` in the book's `index.md` to show your own artwork on the front of its book on the shelves.

```markdown
---
cover: green
coverImage: ./assets/field-notes.webp
---
# Field Notes
```

Use an AVIF, GIF, JPEG, PNG, or WebP file anywhere under `docs/`. Paths are relative to the book's `index.md`. The image fits below the title without cropping. Long titles use up to three lines on the cover, and the book link keeps its full title. Use a small, compressed image for a fast bookshelf.
