export const KindIcons = {
  brand: "lightbulb",
  danger: "exclamationMarkTriangle",
  info: "information",
  success: "checkCircle",
  warning: "exclamationMarkTriangle",
} as const;

export const KindIconsFilled = {
  danger: "exclamationMarkTriangleF",
  info: "informationF",
  success: "checkCircleF",
  warning: "exclamationMarkTriangleF",
} as const;

/**
 * Generates a type guard to narrow an element or event target to the element type for the given Calcite component tag name.
 */
/*#__NO_SIDE_EFFECTS__*/
export function isTag<K extends keyof HTMLElementTagNameMap>(tagName: K) {
  return (element: Element | EventTarget | null | undefined): element is HTMLElementTagNameMap[K] =>
    (element as Element)?.localName === tagName;
}
