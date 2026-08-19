import type { SegmentedControlItem } from "./segmented-control-item";

import { Scale } from "../types";

export const SLOTS = {
  input: "input",
};

export const CSS = {
  label: "label",
  labelScale: (scale: Scale) => `label--scale-${scale}` as const,
  labelHorizontal: "label--horizontal",
  labelOutline: "label--outline",
  labelOutlineFill: "label--outline-fill",
  icon: "icon",
  iconSolo: "icon--solo",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isSegmentedControlItem(el: Element | null | EventTarget): el is SegmentedControlItem["el"] {
  return (el as Element | null)?.tagName === "CALCITE-SEGMENTED-CONTROL-ITEM";
}
