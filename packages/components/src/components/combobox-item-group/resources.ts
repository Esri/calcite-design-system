import type { ComboboxItemGroup } from "./combobox-item-group";

import { Scale } from "../types";

export const CSS = {
  firstTitle: "first-title",
  list: "list",
  label: "label",
  separator: "separator",
  title: "title",
  scale: (scale: Scale) => `scale--${scale}` as const,
};

export const itemSpacingMultiplier = "--calcite-combobox-item-spacing-indent-multiplier";

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isComboboxItemGroup(el: Element | null | EventTarget): el is ComboboxItemGroup["el"] {
  return (el as Element | null)?.tagName === "CALCITE-COMBOBOX-ITEM-GROUP";
}
