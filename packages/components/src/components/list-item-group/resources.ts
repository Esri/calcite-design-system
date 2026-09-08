import { isTag } from "../resources";

export const CSS = {
  container: "container",
  heading: "heading",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isListItemGroup = isTag("calcite-list-item-group");
