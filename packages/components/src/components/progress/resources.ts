import { isTag } from "../resources";

export const CSS = {
  track: "track",
  bar: "bar",
  text: "text",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isProgress = isTag("calcite-progress");
