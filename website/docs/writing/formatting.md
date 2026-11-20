---
title: Formatting and Spell Mode
description: Write block quotes, lists, collapsible notes, math, definitions, code, and footnotes, and see how they appear on the paper.
---
# Formatting and Spell Mode

Each syntax example is followed by its rendered result. Use H1 for a chapter title, H2 for a new page, and H3 for a heading within a page.

## Paper marks

```markdown
**Bold**, *italics*, ~~strikethrough~~, `inline code`
:underline[Underline], :highlight[highlight], :red[red ink]
```

**Bold**, *italics*, ~~strikethrough~~, `inline code`

:underline[Underline], :highlight[highlight], :red[red ink]

Marks keep the paper's serif type. Highlights use pale gold; red ink uses a muted burgundy.

## Block quotes and attribution

```markdown
> What does not kill me makes me stronger.
>
> *— Friedrich Nietzsche*
```

> What does not kill me makes me stronger.
>
> *— Friedrich Nietzsche*

A thin gold rule and inset mark the quoted passage without adding a background. Write the attribution as ordinary italics. Quotes can contain multiple paragraphs, nested quotes, links, and lists.

## Callouts

```markdown
> [!NOTE]
> Keep a copy of the original Markdown and images.
```

> [!NOTE]
> Keep a copy of the original Markdown and images.

Unlike ordinary quotes, callouts have a label and a shaded background. `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, and `[!CAUTION]` also work. Labels follow the site's `locale` setting.

## Lists

```markdown
- First item
  - A nested note
- Next item

9. Review the manuscript
10. Publish the site
```

- First item
  - A nested note
- Next item

9. Review the manuscript
10. Publish the site

Bullets and numbers use muted gold. Nested bullets become hollow circles, and wrapped lines align with the item text. Ordered lists keep the starting number written in Markdown, including two-digit numbers.

## Task lists

```markdown
- [x] Write the manuscript
- [ ] Publish the site
```

- [x] Write the manuscript
- [ ] Publish the site

Small gold boxes show the progress recorded in the source. Readers cannot edit them on the page; the author updates `[x]` in Markdown.

## Horizontal rules

```markdown
The previous topic.

---

The next topic.
```

The previous topic.

---

The next topic.

A fine gold line with a small central diamond separates topics within the same page.

## Collapsible notes

```html
<details><summary>Read the extra notes</summary>

**Additional explanation** goes here.

</details>
```

<details><summary>Read the extra notes</summary>

**Additional explanation** goes here.

</details>

Select the triangle and heading to reveal an indented note. Use Tab to focus it, then Enter or Space to toggle it. Blank lines around the contents allow Markdown inside. Use `<details open>` to start expanded. Scripts and event attributes are removed.

## Math

```latex
An inline equation: $E = mc^2$.

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
```

An inline equation: $E = mc^2$.

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

`$...$` stays in the text line. A separate `$$` block is centered. Long display equations scroll horizontally within the paper. Equations are included in the published HTML and remain readable without JavaScript.

## Definition lists

```markdown
Chapter
: A group of content from one Markdown file.

Page
: A sheet separated by an H2 heading.
```

Chapter
: A group of content from one Markdown file.

Page
: A sheet separated by an H2 heading.

Terms appear in bold, with their definitions indented beneath them. Use this format for a glossary or API terminology.

## Syntax highlighting

````markdown
```typescript
const title: string = "Grimoire";
console.log(title);
```
````

```typescript
const title: string = "Grimoire";
console.log(title);
```

Add a language name to a code fence for muted colors that suit the paper: burgundy keywords, olive strings, and darker ink for the rest. Unknown languages remain plain text. A `mermaid` fence still produces a diagram.

## Footnotes

```markdown
Check the original source[^source].

[^source]: Research notes saved with the manuscript.
```

Check the original source[^source].

[^source]: Research notes saved with the manuscript.

Select the small reference number to reach the note at the end of the page. Select its return arrow to go back to the reference. Footnotes remain available on the page that uses them when H2 headings split a chapter into sheets.

## Tables and matrices

```markdown
| Format | Result |
| --- | --- |
| Markdown | Text |
| Mermaid | Diagram |

[Media examples](./media.md)
```

| Format | Result |
| --- | --- |
| Markdown | Text |
| Mermaid | Diagram |

[Media examples](./media.md)

On a narrow page, the table scrolls horizontally while its first column stays visible. Relative chapter links and heading anchors also work.

## Spell Mode

Set `magicMode: true` in `grimoire.yml` to show the toggle. Highlights draw across the words, bold text lifts, and strikethrough strokes appear. Effects play once when a page comes into view and respect the device's reduced-motion setting.
