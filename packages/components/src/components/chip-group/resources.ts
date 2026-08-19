import type { ChipGroup } from "./chip-group";

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isChipGroup(el: Element | null | EventTarget): el is ChipGroup["el"] {
  return (el as Element | null)?.tagName === "CALCITE-CHIP-GROUP";
}
