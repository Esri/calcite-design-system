import type { CardGroup } from "./card-group";

export const CSS = {
  container: "container",
  checkboxWrapper: "checkbox-wrapper",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isCardGroup(el: Element | null | EventTarget): el is CardGroup["el"] {
  return (el as Element | null)?.tagName === "CALCITE-CARD-GROUP";
}
