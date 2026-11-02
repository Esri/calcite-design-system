import { isTag } from "../resources";

export const CSS = {
  container: "container",
  radio: "radio",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isRadioButton = isTag("calcite-radio-button");
