import { isTag } from "../resources";

export const CSS = {
  offset: "offset",
};

export const SLOTS = {
  labelContent: "label-content",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isInputTimeZone = isTag("calcite-input-time-zone");
