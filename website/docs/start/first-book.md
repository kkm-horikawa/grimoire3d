# Your first book

## Preview existing Markdown

Run `npx grimoire3d serve` from your project directory. Grimoire3D looks for Markdown in the `docs/` folder directly under that directory by default. Existing Markdown works without a scaffold. See the [configuration guide](../publishing/metadata.md) when you want to customize the library.

Open the URL shown in the terminal. The preview updates when you add, save, or remove a Markdown file. Use `--docs-dir handbook` to read from `handbook/` or `--port 3001` to use port 3001.

## Install the CLI

Use a maintained Node.js 22, 24, or 26 release. To pin the CLI for your project, add it as a development dependency.

```sh
npm install --save-dev grimoire3d
```

After `npm install -g grimoire3d`, you can run `grimo serve` and `grimo build`.

## Add Markdown

Create `docs/index.md` in your project.

```markdown
# Field Notes

This is my first 3D book.
```

Add `docs/01-setup.md` to write another chapter. To create a bookshelf, put each book in its own folder directly under `docs/`. Give each folder an `index.md` with the title of the book.

## Navigate the library

Choose a cover to open its book. Use the arrows on screen or the Left and Right arrow keys to turn the page. On a phone, swipe left for the next page or right for the previous one.

Open **Contents** to jump to a chapter or section. Long pages scroll vertically within the paper. In a large library, use the title search or switch from **Shelves** to **Index**.
