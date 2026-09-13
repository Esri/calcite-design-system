import { isTag } from "../resources";

export const CSS = {
  container: "container",
  loader: "loader",
  percentage: "percentage",
  progressRing: "ring--progress",
  ring: "ring",
  rings: "rings",
  text: "text",
  trackRing: "ring--track",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isLoader = isTag("calcite-loader");
