import { isTag } from "../resources";

export const CSS = {
  positionContainer: "position-container",
  container: "container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isTooltip = isTag("calcite-tooltip");
