import { isTag } from "../resources";

export const CSS = {
  icon: "icon",
  flipRtl: "flip-rtl",
  svg: "svg",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isIcon = isTag("calcite-icon");
