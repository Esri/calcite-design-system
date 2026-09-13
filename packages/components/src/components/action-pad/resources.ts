import { isTag } from "../resources";

export const CSS = {
  actionGroupEnd: "action-group--end",
  container: "container",
};

export const SLOTS = {
  expandTooltip: "expand-tooltip",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isActionPad = isTag("calcite-action-pad");
