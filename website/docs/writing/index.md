---
cover: green
description: Organize Markdown files into books with chapters, sections, and stable links.
chapters: [formatting.md, media.md]
---
# Writing Books

Each folder directly under `docs/` becomes a book. Its Markdown files become chapters. Loose Markdown files directly in `docs/` share a separate book. Nested folders stay in the same book by default, with their `index.md` introducing each chapter group.

```text
docs/
├── index.md              # Book of loose Markdown files
├── notes.md
└── handbook/             # Another book
    ├── index.md          # Book introduction
    ├── setup.md
    └── examples/         # Chapter group within handbook
        ├── index.md      # Group introduction
        └── cli.md
```

Title search appears with seven or more books. It also appears in smaller libraries if any book has a category or publication date.

## Chapters and sections

Each folder starts with its `index.md`. Set the order of what follows in that file's YAML front matter.

```yaml
chapters:
  - setup.md
  - examples/
  - reference.md
```

Listed chapters and folders come first. Unlisted items follow in natural filename order (`2` before `10`), which is also the default without `chapters`. A nested folder uses its own `index.md` to order its contents.

Entries must name direct Markdown files or folders in the same book. Missing entries, duplicates, and deeper paths stop the build with the affected `index.md` in the error. Chapter filenames and URLs stay unchanged.

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

Use `category` in a book's `index.md` to place it with related books under a labeled shelf plate. The library also lets readers filter by category.

To give a nested folder its own book, set `book: true` in that folder's `index.md`. For example, put the following in `docs/system/data/index.md` to move its chapters into **Data Models**. Give `docs/system/index.md` the same category to place both books on the **System** shelf.

```markdown
---
book: true
title: Data Models
category: System
---
# Data Models
```

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
