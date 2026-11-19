# Formatting and Spell Mode

Grimoire3D renders headings, lists, block quotes, links, **bold**, *italics*, ~~strikethrough~~, and `inline code`. Use a fenced code block for commands or snippets.

## Paper marks

:underline[Underline a term], :highlight[highlight a phrase], or call something out in :red[red ink].

```markdown
:underline[Underline a term]
:highlight[highlight a phrase]
:red[red ink]
```

> [!WARNING]
> Keep a copy of your Markdown and media when moving an existing library.

Start a block quote with `[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, or `[!CAUTION]` to create a callout.

## Tables and matrices

Use GitHub Flavored Markdown table syntax. On a narrow page, the table scrolls horizontally and its first column stays visible for comparison.

| Format | Live preview | Static site | Inline control | Interaction | Content source |
| --- | --- | --- | --- | --- | --- |
| AVIF | Yes | Yes | Image | Read | Local or remote |
| GIF | Yes | Yes | Image | Animate | Local or remote |
| MP4 | Yes | Yes | Video | Play and seek | Local or remote |
| Mermaid | Yes | Yes | Diagram | Zoom and pan | Markdown fence |

## Spell Mode

Set `magicMode: true` in `grimoire.yml` to add a **Spell mode** toggle to the reader. After a page comes to rest, the marker draws a stroke that stays on the paper, bold letters lift and settle, and strikethrough draws across the words.

The effects play once each time the page comes into view, or when you enable Spell mode on an open page. The reader respects the device's reduced-motion setting.
