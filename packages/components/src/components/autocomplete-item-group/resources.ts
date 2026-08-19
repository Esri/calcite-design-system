import type { AutocompleteItemGroup } from "./autocomplete-item-group";

import { Scale } from "../types";

export const CSS = {
  container: "container",
  containerNoSpacing: "container--no-spacing",
  firstTitle: "first-title",
  heading: "heading",
  scale: (scale: Scale) => `scale--${scale}` as const,
  separator: "separator",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isAutocompleteItemGroup(el: Element | null | EventTarget): el is AutocompleteItemGroup["el"] {
  return (el as Element | null)?.tagName === "CALCITE-AUTOCOMPLETE-ITEM-GROUP";
}
