import type { SegmentedControl } from "./segmented-control";

export const CSS = {
  itemWrapper: "item-wrapper",
};

export const IDS = {
  validationMessage: "segmentedControlValidationMessage",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isSegmentedControl(el: Element | null | EventTarget): el is SegmentedControl["el"] {
  return (el as Element | null)?.tagName === "CALCITE-SEGMENTED-CONTROL";
}
