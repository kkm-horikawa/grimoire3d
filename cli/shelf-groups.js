/**
 * Put books from the same category together in the order each category first appeared.
 * @template {{category?: string}} T
 * @param {T[]} books
 */
export function shelfGroups(books) {
  /** @type {Map<string, T[]>} */
  const groups = new Map();
  /** @type {T[]} */
  const others = [];
  for (const book of books) {
    if (!book.category) {
      others.push(book);
      continue;
    }
    const category = groups.get(book.category) ?? [];
    category.push(book);
    groups.set(book.category, category);
  }
  /** @type {{category?: string, books: T[]}[]} */
  const sections = [...groups].map(([category, books]) => ({
    category,
    books,
  }));
  if (others.length) sections.push({ books: others });
  return sections;
}

import { createElement as element } from "react";

/** @param {{ category: string }} props */
export function ShelfPlate({ category }) {
  return element(
    "div",
    { className: "shelf-label-rail" },
    element("h2", { className: "shelf-plate" }, category)
  );
}
