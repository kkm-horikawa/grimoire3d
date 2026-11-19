# Grimoire3D

Turn Markdown into 3D books you can open and flip through in a browser.

[![npm version](https://img.shields.io/npm/v/grimoire3d)](https://www.npmjs.com/package/grimoire3d)

![A Markdown chapter is added under docs, then opened and paged through from the Grimoire3D bookshelf](docs/book-experience/quick-start.gif)

[Read the documentation](https://kkm-horikawa.github.io/grimoire3d/)

## Install

Use a maintained Node.js 22, 24, or 26 release. Install Grimoire3D from npm in the project where you want to write your books. If the project has no `package.json`, run `npm init -y` first.

```sh
npm install --save-dev grimoire3d
```

## Write and preview

Create `docs/field-notes/index.md`.

```markdown
# Field Notes

This is my first 3D book.
```

Add Markdown files in the same folder for more chapters. Add folders directly under `docs/` for more books.

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

For chapter links, formatting, media, Mermaid, cover styles, locale, and SEO, see the [Grimoire3D documentation](https://kkm-horikawa.github.io/grimoire3d/).

[Contributing](CONTRIBUTING.md) · [MIT License](LICENSE)
