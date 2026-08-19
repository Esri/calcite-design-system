import type { Autocomplete } from "./autocomplete";

export const SLOTS = {
  contentBottom: "content-bottom",
  contentTop: "content-top",
} as const;

export const CSS = {
  inputContainer: "input-container",
  input: "input",
  contentContainer: "content-container",
  contentAnimation: "content-animation",
  content: "content",
  contentHidden: "content--hidden",
  floatingUIContainer: "floating-ui-container",
  floatingUIContainerActive: "floating-ui-container--active",
  screenReadersOnly: "screen-readers-only",
} as const;

const idPrefix = "autocomplete";

export const IDS = {
  validationMessage: "autocompleteValidationMessage",
  input: (id: string) => `${idPrefix}-input-${id}`,
  list: (id: string) => `${idPrefix}-list-${id}`,
} as const;

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isAutocomplete(el: Element | null | EventTarget): el is Autocomplete["el"] {
  return (el as Element | null)?.tagName === "CALCITE-AUTOCOMPLETE";
}
