import type { ReactElement } from "react";

export function shelfGroups<T extends { category?: string }>(
  books: T[]
): { category?: string; books: T[] }[];

export function ShelfPlate(props: { category: string }): ReactElement;
