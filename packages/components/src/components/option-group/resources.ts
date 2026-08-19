import type { OptionGroup } from "./option-group";

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isOptionGroup(el: Element | null | EventTarget): el is OptionGroup["el"] {
  return (el as Element | null)?.tagName === "CALCITE-OPTION-GROUP";
}
