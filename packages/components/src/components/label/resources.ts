import { isTag } from "../resources";

export const CSS = {
  container: "container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isLabel = isTag("calcite-label");
