import { isTag } from "../resources";

export const CSS = {
  container: "container",
  track: "track",
  handle: "handle",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isSwitch = isTag("calcite-switch");
