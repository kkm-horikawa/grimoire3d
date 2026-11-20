# Grimoire3D

Turn Markdown into 3D books you can open and flip through in a browser.

[![npm version](https://img.shields.io/npm/v/grimoire3d)](https://www.npmjs.com/package/grimoire3d)

![A Markdown chapter is added under docs, then opened and paged through from the Grimoire3D bookshelf](docs/book-experience/quick-start.gif)

[Read the documentation](https://kkm-horikawa.github.io/grimoire3d/)

## Quick start

Run `npx grimoire3d serve` from your project directory and open the URL it prints. Grimoire3D looks for Markdown in the `docs/` folder directly under that directory by default. Existing Markdown works without a scaffold. See the [configuration guide](https://kkm-horikawa.github.io/grimoire3d/read/publishing/metadata/) when you want to customize the library.

If your Markdown lives in `handbook/`, add `--docs-dir handbook` to either `serve` or `build`.

## Install

Use a maintained Node.js 22, 24, or 26 release. To pin the CLI for your project, add it as a development dependency.

```sh
npm install --save-dev grimoire3d
```

For a global installation, run `npm install -g grimoire3d`, then use `grimo serve` or `grimo build`.

## Write and preview

Create `docs/field-notes/index.md`.

```markdown
# Field Notes

This is my first 3D book.
```

Each folder directly under `docs/` becomes a book, and its Markdown files become chapters. Loose Markdown files directly in `docs/` share a separate book. Nested folders form chapter groups within the same book.

Books use the title or top-level heading in their `index.md`, then the first heading in their `README.md`. The default title is **Overview** for loose files and the folder name for each folder book.

```text
docs/
├── index.md                 # Book of loose Markdown files
├── notes.md
└── field-notes/              # Another book
    ├── index.md              # Introduction and book settings
    ├── setup.md
    └── examples/             # Chapter group in the same book
        ├── index.md
        └── cli.md
```

Set `chapters: [setup.md, examples/]` in each folder's `index.md` front matter to choose what follows its introduction. Unlisted chapters follow in natural filename order. Title search appears with seven or more books, or whenever a book has a category or publication date.

```sh
npx grimoire3d serve
```

Open the URL printed in the terminal. The preview updates when you save.

![Workflow from Markdown files to a local bookshelf and a static site in dist](docs/book-experience/workflow.avif)

## Build and publish

```sh
npx grimoire3d build
```

Deploy the contents of `dist/` to any static host, including Cloudflare Pages and GitHub Pages. Use `--out-dir site` to choose a different output directory.

Block quotes, lists, task lists, collapsible notes, math, definition lists, syntax highlighting, and footnotes are supported. See the [syntax and rendered examples](https://kkm-horikawa.github.io/grimoire3d/read/writing/formatting/) and [site settings and SEO examples](https://kkm-horikawa.github.io/grimoire3d/read/publishing/metadata/).

[Contributing](CONTRIBUTING.md) · [MIT License](LICENSE)
