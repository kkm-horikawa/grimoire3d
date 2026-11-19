---
cover: green
description: Organize Markdown files into books with chapters, sections, and stable links.
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

Files directly in `docs/` share a book of their own. The bookshelf opens when the project has book folders.

## Chapters and sections

Inside a book, `index.md` comes first. Other chapters follow in filename order, including files in subfolders. For a series such as release notes, keep separate version files in the same folder.

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
