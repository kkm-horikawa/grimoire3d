import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { readLibrary } from "../../cli/content.js";
import { writeStaticPages } from "../../cli/static-pages.js";
import { copy } from "../../src/site/types";

vi.stubGlobal("matchMedia", () => ({ matches: false }));
const { default: PageMarkdown } = await import("../../src/site/PageMarkdown");

const source = String.raw`# 紙面の記法

> 私を殺さないものは、私を強くする。
>
> *— フリードリヒ・ニーチェ*

> [!NOTE]
> 注記は引用と区別する。

- 通常の項目
  - 入れ子

9. 九番
10. 十番

- [x] 準備した
- [ ] 公開する

---

<details open><summary>補足を開く</summary>

**詳細な説明**と[別の章](./other.md)。

</details>

本文中の式 $E = mc^2$。

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

章
: Markdownファイル単位のまとまり。

:underline[下線] :highlight[マーカー] :red[赤字]

~~~typescript
const title: string = "Grimoire";
~~~

~~~mermaid
graph LR
  A --> B
~~~

~~~unknown-language
plain text
~~~

本文の出典[^出典]。再度の出典[^出典]。

[^出典]: 脚注の説明。

<script>window.injected = true</script>
<img src="x" onerror="alert(1)">
<a href="javascript:alert(1)">不正なリンク</a>
`;
const projects: string[] = [];
afterEach(async () => {
  await Promise.all(
    projects.splice(0).map((root) => rm(root, { recursive: true, force: true }))
  );
});

it("renders the same rich Markdown and safe author HTML in the live and published reader", async () => {
  const root = await mkdtemp(join(tmpdir(), "grimoire-markup-"));
  projects.push(root);
  await mkdir(join(root, "docs/book"), { recursive: true });
  await mkdir(join(root, "template"));
  await writeFile(join(root, "docs/book/index.md"), source);
  await writeFile(join(root, "docs/book/other.md"), "# 別の章");
  await writeFile(
    join(root, "template/index.html"),
    '<html lang="en"><head><title>Book</title></head><body><div id="root"></div></body></html>'
  );
  const library = await readLibrary(root, { locale: "ja" });
  expect(library.issues).toEqual([]);
  await writeStaticPages(join(root, "template"), join(root, "dist"), library);
  const html = await readFile(
    join(root, "dist/read/book/index/index.html"),
    "utf8"
  );
  const published = document.createElement("div");
  published.innerHTML = html;
  const live = render(
    <PageMarkdown
      page={library.books[0].pages[0]}
      text={copy.ja}
      locale="ja"
      onReady={() => {}}
    />
  );
  for (const container of [
    published.querySelector("article")!,
    live.container,
  ]) {
    expect(
      container.querySelector("blockquote:not(.paper-alert)")?.textContent
    ).toContain("ニーチェ");
    expect(container.querySelector(".paper-alert-label")?.textContent).toBe(
      "注記"
    );
    expect(container.querySelector("ul ul li")?.textContent).toBe("入れ子");
    expect(container.querySelector('ol[start="9"]')).not.toBeNull();
    expect(
      container.querySelectorAll('input[type="checkbox"][disabled]')
    ).toHaveLength(2);
    expect(container.querySelector("input[checked]")).not.toBeNull();
    expect(container.querySelector("hr")).not.toBeNull();
    expect(container.querySelector("details[open] summary")?.textContent).toBe(
      "補足を開く"
    );
    expect(container.querySelector("details strong")?.textContent).toBe(
      "詳細な説明"
    );
    expect(container.querySelectorAll(".katex")).toHaveLength(2);
    expect(container.querySelectorAll(".katex-display")).toHaveLength(1);
    expect(container.querySelector("p .katex")).not.toBeNull();
    expect(container.querySelector(".katex-display math")).not.toBeNull();
    expect(container.querySelector("dl dt")?.textContent).toBe("章");
    expect(container.querySelector("dl dd")?.textContent).toContain("Markdown");
    expect(container.querySelectorAll("u, mark, .paper-red")).toHaveLength(3);
    if (container === published.querySelector("article"))
      expect(container.querySelector(".language-mermaid")?.className).toBe(
        "language-mermaid"
      );
    expect(
      container.querySelector(".language-typescript .hljs-keyword")?.textContent
    ).toBe("const");
    expect(
      container.querySelector(".language-unknown-language")?.textContent
    ).toContain("plain text");
    for (const link of container.querySelectorAll<HTMLAnchorElement>(
      "[data-footnote-ref], [data-footnote-backref]"
    )) {
      const id = decodeURIComponent(link.getAttribute("href")!.slice(1));
      expect(
        Array.from(container.querySelectorAll("[id]")).some(
          (node) => node.id === id
        )
      ).toBe(true);
    }
    expect(
      container.querySelector(".footnotes li")?.getAttribute("tabindex")
    ).toBe("-1");
    expect(container.querySelector(".footnotes h2")?.className).toBe("sr-only");
    const label = container
      .querySelector("[data-footnote-ref]")
      ?.getAttribute("aria-describedby");
    expect(
      Array.from(container.querySelectorAll("[id]")).find(
        (node) => node.id === label
      )?.textContent
    ).toBe("脚注");
    expect(
      container.querySelector("script, [onerror], [href^='javascript:']")
    ).toBeNull();
  }
  expect(live.container.querySelector("details a")?.getAttribute("href")).toBe(
    "#/book/other"
  );
  expect(published.querySelector("details a")?.getAttribute("href")).toBe(
    "../../../read/book/other/"
  );
});

it("keeps math and details together and carries footnote definitions across H2 sheets", async () => {
  const root = await mkdtemp(join(tmpdir(), "grimoire-markup-sheets-"));
  projects.push(root);
  await mkdir(join(root, "docs"));
  await writeFile(
    join(root, "docs/index.md"),
    String.raw`# 数式と脚注

$$
## this is not a Markdown heading
$$

<details><summary>補足</summary>

## 内部の見出し

補足の内容。

</details>

<!-- <details> is only a comment. -->

## 次のページ

ここで参照する[^source]。

[^source]: 元の資料。
`
  );
  const { books } = await readLibrary(root, { locale: "ja" });
  expect(books[0].pages).toHaveLength(2);
  expect(books[0].pages[0].markdown).toContain("</details>");
  expect(books[0].pages[1].markdown).toContain("[^source]: 元の資料。");
});
