import type { JSX, Ref } from "react";

export function BookCover(props: {
  title: string;
  src?: string;
  compact?: string;
  artwork?: string;
  loading?: "eager" | "lazy";
  titleRef?: Ref<HTMLSpanElement>;
}): JSX.Element;
