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
