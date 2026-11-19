# Your first book

## Install the CLI

Use a maintained Node.js 22, 24, or 26 release. Install Grimoire3D from npm in the project where you want to write your book. If the project has no `package.json`, run `npm init -y` first.

```sh
npm install --save-dev grimoire3d
```

## Add Markdown

Create `docs/index.md` in your project.

```markdown
# Field Notes

This is my first 3D book.
```

Add `docs/01-setup.md` to write another chapter. To create a bookshelf, put each book in its own folder directly under `docs/`. Give each folder an `index.md` with the title of the book.

## Preview the book

```sh
npx grimoire3d serve
```

Open the URL shown in the terminal. The preview updates when you add, save, or remove a Markdown file. Use `--port 3001` if port 3000 is in use.

## Navigate the library

Choose a cover to open its book. Use the arrows on screen or the Left and Right arrow keys to turn the page. On a phone, swipe left for the next page or right for the previous one.

Open **Contents** to jump to a chapter or section. Long pages scroll vertically within the paper. In a large library, use the title search or switch from **Shelves** to **Index**.
