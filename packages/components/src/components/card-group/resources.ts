import { isTag } from "../resources";

export const CSS = {
  container: "container",
  checkboxWrapper: "checkbox-wrapper",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isCardGroup = isTag("calcite-card-group");
