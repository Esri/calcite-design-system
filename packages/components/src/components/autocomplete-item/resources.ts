import type { AutocompleteItem } from "./autocomplete-item";

import { Scale } from "../types";

export const CSS = {
  container: "container",
  containerActive: "container--active",
  contentCenter: "content-center",
  description: "description",
  heading: "heading",
  iconEnd: "icon-end",
  iconStart: "icon-start",
  scale: (scale: Scale) => `scale--${scale}` as const,
} as const;

export const SLOTS = {
  contentEnd: "content-end",
  contentStart: "content-start",
} as const;

const idPrefix = "autocomplete-item";

export const IDS = {
  host: (id: string) => `${idPrefix}-${id}`,
} as const;

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isAutocompleteItem(el: Element | null | EventTarget): el is AutocompleteItem["el"] {
  return (el as Element | null)?.tagName === "CALCITE-AUTOCOMPLETE-ITEM";
}
