import { isTag } from "../resources";

export const CSS = {
  container: "container",
  groupContainer: "group-container",
  scrim: "scrim",
  assistiveText: "assistive-text",
};

export const blockGroupSelector = "calcite-block-group";

export const blockSelector = "calcite-block";

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isBlockGroup = isTag("calcite-block-group");
