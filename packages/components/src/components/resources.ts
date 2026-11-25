export const KindIcons = {
  brand: "lightbulb",
  danger: "exclamation-mark-triangle",
  info: "information",
  success: "check-circle",
  warning: "exclamation-mark-triangle",
} as const;

export const KindIconsFilled = {
  danger: "exclamation-mark-triangle-f",
  info: "information-f",
  success: "check-circle-f",
  warning: "exclamation-mark-triangle-f",
} as const;

/**
 * Generates a type guard to narrow an element or event target to the element type for the given Calcite component tag name.
 */
/*#__NO_SIDE_EFFECTS__*/
export function isTag<K extends keyof HTMLElementTagNameMap>(tagName: K) {
  return (element: Element | EventTarget | null | undefined): element is HTMLElementTagNameMap[K] =>
    (element as Element)?.localName === tagName;
}
