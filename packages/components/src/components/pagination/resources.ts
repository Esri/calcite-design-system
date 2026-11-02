import { isTag } from "../resources";
import { IconName } from "../icon/types";

export const CSS = {
  list: "list",
  listItem: "list-item",
  hiddenItem: "hidden-item",
  page: "page",
  selected: "selected",
  chevron: "chevron",
  disabled: "disabled",
  ellipsis: "ellipsis",
};

export const ICONS: Record<string, IconName> = {
  next: "chevron-right",
  previous: "chevron-left",
  first: "chevron-start",
  last: "chevron-end",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isPagination = isTag("calcite-pagination");
