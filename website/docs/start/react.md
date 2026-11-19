# Use BookViewer in React

In a React 19 app, use `BookViewer` to display a book with React content. Install the same package archive used by [the CLI](./first-book.md#install-the-cli), then import the component and its stylesheet.

```tsx
import { BookViewer } from "grimoire3d/components";
import "grimoire3d/styles.css";

export function Documentation() {
  return (
    <BookViewer
      pages={[
        {
          id: "intro",
          title: "Introduction",
          front: <h1>Field Notes</h1>,
          back: <p>Welcome to the project.</p>,
        },
      ]}
    />
  );
}
```

Each item in `pages` represents a physical sheet with a front and a back. Set `initialPage` to the zero-based index of the starting sheet. Use `onPageChange` to receive the index when the reader turns a page.
