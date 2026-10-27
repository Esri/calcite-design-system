import { isTag } from "../resources";

export const CSS = {
  title: "title",
  firstTitle: "first-title",
  separator: "separator",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isDropdownGroup = isTag("calcite-dropdown-group");
