import { isTag } from "../resources";

export const SLOTS = {
  trigger: "trigger",
};

export const CSS = {
  content: "content",
  wrapper: "wrapper",
  triggerContainer: "trigger-container",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isDropdown = isTag("calcite-dropdown");
