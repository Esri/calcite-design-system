import { isTag } from "../resources";

export const CSS = {
  toggle: "toggle",
  check: "check-svg",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isCheckbox = isTag("calcite-checkbox");
