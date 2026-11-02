import { isTag } from "../resources";

export const CSS = {
  itemWrapper: "item-wrapper",
};

export const IDS = {
  validationMessage: "segmentedControlValidationMessage",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isSegmentedControl = isTag("calcite-segmented-control");
