import type { Accordion } from "./accordion";

export const CSS = {
  accordion: "accordion",
  transparent: "accordion--transparent",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isAccordion(el: Element | null | EventTarget): el is Accordion["el"] {
  return (el as Element | null)?.tagName === "CALCITE-ACCORDION";
}
