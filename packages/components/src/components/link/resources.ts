import { isTag } from "../resources";

export const CSS = {
  icon: "link--icon",
  iconStart: "icon-start",
  iconEnd: "icon-end",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isLink = isTag("calcite-link");
