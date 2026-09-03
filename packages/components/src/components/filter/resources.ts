import { isTag } from "../resources";

export const CSS = {
  container: "container",
};

export const ICONS = {
  search: "search",
  close: "x",
} as const;

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isFilter = isTag("calcite-filter");
