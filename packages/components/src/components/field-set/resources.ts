import { isTag } from "../resources";

export const CSS = {
  container: "container",
  legend: "legend",
  fieldWrapper: "field-wrapper",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isFieldSet = isTag("calcite-field-set");
