import { isTag } from "../resources";

export const CSS = {
  icon: "icon",
  iconContainer: "icon-container",
  select: "select",
  wrapper: "wrapper",
};

export const IDS = {
  validationMessage: "selectValidationMessage",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isSelect = isTag("calcite-select");
