import { isTag } from "../resources";

export const CSS = {
  container: "container",
  containerColumns: "container--columns",
  containerHorizontal: "container--horizontal",
  containerVertical: "container--vertical",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isFieldGroup = isTag("calcite-field-group");
