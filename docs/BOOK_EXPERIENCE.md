# Grimoire3D bookshelf and reader

The CLI turns Markdown in `docs/` into a live preview and a static site. Readers can open a shared chapter URL, pick a book from a shelf, or jump to a section from the contents. See the [user documentation source](../website/docs/) for installation, configuration, and Markdown examples.

The original work tracked [the CLI](https://github.com/kkm-horikawa/grimoire3d/issues/3), [content rendering](https://github.com/kkm-horikawa/grimoire3d/issues/2), [BookViewer](https://github.com/kkm-horikawa/grimoire3d/issues/1), and [navigation](https://github.com/kkm-horikawa/grimoire3d/issues/16).

![The current Markdown-to-book workflow](book-experience/workflow.avif)

## Bookshelf and reader behavior

A project with only root-level Markdown opens its book immediately. When there are book folders, the library opens to the bookshelf. Root-level Markdown can coexist with folder books as a separate volume. A folder's `index.md` comes first and names its book. Subfolders group chapters, and folders named `assets` and hidden paths are excluded from the contents. English paths can map to Japanese H1s and display titles. Set `locale: ja` to localize the controls and set the HTML language.

For seven or more books, the shelf offers title search and a separate alphabetical index. In a 100-book library, the shelf starts with 12 books and loads subsequent shelves as the reader scrolls. Search matches every book, including those outside the visible shelves. A single match moves forward and settles in the center. Multiple matches share the front shelf. Enter opens a single or keyboard-selected match. Clearing the query restores the full library. Returning from a book restores the query, selected library view, scroll position, and focus. Readers using reduced motion, a keyboard, or a screen reader can reach the same books.

On desktop, the first spread shows pages 1 and 2. The reverse of page 2 carries page 3 to the left and reveals page 4 on the right. On a phone, the reader shows one page and accepts horizontal swipes. A file starts a chapter and H2 starts a new page, except when the first H2 immediately follows the chapter title. H3 remains on the same page. Long content scrolls within the paper. Text selection, links, and code copying work in the reader. WebGL is optional for reading and navigation.

Contents lists H2 headings and page numbers beneath each chapter. A bookmark identifies the current entry. Long labels wrap before the expand control and page number. The panel opens on the right on desktop and from the bottom on phones. Selecting an entry on another spread turns the page. Selecting an entry on the same spread scrolls within the paper. Escape closes the panel and restores focus to its button. Chapter and heading URLs remain stable if page numbers change.

Local AVIF, WebP, PNG, JPEG, GIF, and MP4 assets use paths relative to their chapters. The build copies referenced assets, preserves alt descriptions, and sizes image and video elements to fit the paper.

## Design references

The approved mockups use a red leather book, a bookshelf, a large-library index, search motion, and Japanese localization. The later revision reduces text sizes. Feedback from the working reader led to a larger desktop book and a single reading mode.

| Screen | Large monitor | Laptop | Phone |
| --- | --- | --- | --- |
| Bookshelf | [Mockup](book-experience/shelf-large-v2.avif) | [Mockup](book-experience/shelf-laptop-v2.avif) | [Mockup](book-experience/shelf-mobile-v2.avif) |
| Reader | [Mockup](book-experience/read-large-v2.avif) | [Mockup](book-experience/read-laptop-v2.avif) | [Mockup](book-experience/read-mobile-v2.avif) |
| Contents | [Mockup](book-experience/contents-large.avif) | [Mockup](book-experience/contents-laptop.avif) | [Mockup](book-experience/contents-mobile.avif) |
| Library index | [Mockup](book-experience/index-large-v2.avif) | [Mockup](book-experience/index-laptop-v2.avif) | [Mockup](book-experience/index-mobile-v2.avif) |

[Large bookshelf](book-experience/shelf-many.avif) · [Search motion](book-experience/search-pull.avif) · [Phone search](book-experience/search-mobile.avif) · [Japanese reader](book-experience/read-ja-large.avif) · [Page-turn concept](book-experience/explore.avif)

[Annotated design references](book-experience/review/) use the same filenames as the source mockups. The [image generation prompts](book-experience/PROMPTS.md) record the initial and revised designs.

The [approved library footer](https://github.com/kkm-horikawa/grimoire3d/issues/32#footer-design-proposal) puts attribution after the last item in Shelves and Index. On desktop the optional publisher appears on the left and Grimoire3D on the right. The links stack on phones. See the issue for the three approved mockups and the linked implementation review.

The [approved category and date controls](https://github.com/kkm-horikawa/grimoire3d/issues/34#category-and-sort-design-proposal) sit below the search and view controls. Each appears when the library contains its corresponding metadata. Both views share the selections.

The [approved custom artwork design](https://github.com/kkm-horikawa/grimoire3d/issues/35#long-title-with-a-portrait-image) reserves separate rows for the title and the image inside each cover. The title takes up to three lines and the image fits in the height below it.

## Browser verification

The following checks were performed on November 19, 2026.

- Installed the npm package archive in a clean Node.js 22 project. With no configuration, `docs/index.md` and `docs/01-setup.md` opened as one book. Adding, editing, and deleting Markdown updated the preview. Missing Markdown, an unsupported locale, and an occupied output directory produced actionable messages.
- Built and served the library at the site root and under a subpath. Verified direct chapter loads, Markdown links, Japanese headings on English paths, AVIF images, animated GIFs, and MP4 playback. Read release notes with JavaScript disabled and checked canonical URLs and the sitemap.
- Opened a book initially outside the viewport in a 100-book library. Tested zero, one, and multiple search matches, the index, keyboard focus on return, and touch. The reader preserved the chapter on resize and could recover after WebGL context loss.
- Installed the archive in a separate React 19 app. Both exports of `BookViewer` rendered the cover, the reverse of the previous sheet, and the new chapter, and fired `onPageChange(1)`. The standalone React component's Explore toggle was also exercised.
- Verified opening and returning to the shelf at 1920×1080, 1280×720, and 390×844. The cover hides the paper as it finishes closing. Keyboard and touch can open a book, and focus returns to the book's shelf position.
- Turned forward and back through a four-page Japanese book. The live DOM changes when the sheet lands, and the moving 3D sheet carries its front and back content. The visible end of a scrolled page travels with the sheet. Reduced motion switches pages immediately.
- Checked browser diagrams at desktop and phone sizes, including zoom, pointer and touch panning, and fit to view. YouTube and Vimeo controls and players fit within paper at 320px, 390px, and 412px.

### Visual comparisons

Each comparison contains the mockup, the live browser, their overlay, and an amplified difference view. The runs share the same screen size, chapter, and search text. The review covered the outline, leather and paper, title and code placement, and shelf shadows.

| Screen | 1920×1080 | 1280×720 | 390×844 |
| --- | --- | --- | --- |
| Bookshelf | [Comparison](book-experience/comparison/shelf-large-comparison.avif) | [Comparison](book-experience/comparison/shelf-laptop-comparison.avif) | [Comparison](book-experience/comparison/shelf-mobile-comparison.avif) |
| Reader | [Comparison](book-experience/comparison/read-large-comparison.avif) | [Comparison](book-experience/comparison/read-laptop-comparison.avif) | [Comparison](book-experience/comparison/read-mobile-comparison.avif) |
| Contents | [Comparison](book-experience/comparison/contents-large-comparison.avif) | [Comparison](book-experience/comparison/contents-laptop-comparison.avif) | [Comparison](book-experience/comparison/contents-mobile-comparison.avif) |
| Library index | [Comparison](book-experience/comparison/index-large-comparison.avif) | [Comparison](book-experience/comparison/index-laptop-comparison.avif) | [Comparison](book-experience/comparison/index-mobile-comparison.avif) |

[Turning pages 1–4](book-experience/comparison/page-turn-order.avif) · [Opening and returning a book](book-experience/comparison/shelf-book-transition.avif) · [Searching 100 books on desktop](book-experience/comparison/search-large-comparison.avif) · [Searching on a phone](book-experience/comparison/search-mobile-comparison.avif)

### Rendering and performance

The cover uses AVIF artwork. The reader uses the [Blender model](../assets/book/README.md) to bend the sheet with its text attached, and idle pages do not continuously redraw. In a headless Chrome search benchmark with 16 inputs, input-to-frame latency was 9.9 ms median and 13.0 ms at the 95th percentile on desktop. On mobile it was 9.4 ms and 12.4 ms. Repeated searches could take several hundred milliseconds on SwiftShader.

The 3D reader recorded 50.6–90.2 ms from click to rendering at 1920×1080, with frame intervals of 16.8–17.1 ms at the 95th percentile. At 1280×720, those figures were 49.5–96.1 ms and 16.8–16.9 ms. After adding an immediate animation response while the turn prepares, the first visible reaction took 37–52 ms and subsequent reactions took 16–115 ms. At 2381×1107 and 1280×720, the heading differed by no more than 3 px at the start of a turn and 5 px immediately before landing. Pagination arrows held their position as the chapter title changed.

Spell Mode runs once after a page has landed or is opened directly, and when the reader enables it on the current page. The marker stroke stays visible and bold letters return to their original positions. With reduced motion, text stays still. After reducing outside margins and raising the first heading on phones, the effects were checked at 320px, 390px, and 412px.

### Lighthouse

The target is 100 in every category on desktop and mobile for both the bookshelf and a chapter before any external video is loaded. The initial Lighthouse 13.6.0 release-notes audit at a subpath scored 100 for Accessibility and SEO, 96 for Best Practices, 89 mobile and 67 desktop for Performance, and 99 mobile and 100 desktop for Agentic Browsing. The missing favicon gave a 404. Mobile LCP was 3.8 seconds and desktop Total Blocking Time was 770 ms.

After tuning, a gzip-enabled local static server scored 100 in all five categories in all four audits. Mobile LCP was 1.5 seconds for the bookshelf and 1.3 seconds for the chapter. Desktop LCP was 0.4 and 0.6 seconds. CLS was 0 in every case. These results apply to the local test setup.

The published [GitHub Pages documentation](https://kkm-horikawa.github.io/grimoire3d/) also scored 100 in all five categories in Lighthouse 13.6.0. The four runs covered the bookshelf and the [media chapter](https://kkm-horikawa.github.io/grimoire3d/read/writing/media/) on mobile and desktop before an external player was loaded. In the published reader, the desktop headings start 8 px higher and align across both pages. Browser checks also covered direct chapter links, the sitemap, inline MP4, and the phone-width video layout.
