import type { JSX } from "react";

export interface LibraryPublisher {
  label: string;
  url?: string;
}

export function LibraryFooter(props: {
  publisher?: LibraryPublisher;
}): JSX.Element;
