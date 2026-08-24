import { isTag } from "../resources";

export const CSS = {
  sortItem: "sort-item",
  container: "container",
  containerHorizontal: "container--horizontal",
  containerVertical: "container--vertical",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isSortableList = isTag("calcite-sortable-list");
