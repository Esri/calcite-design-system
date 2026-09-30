import { isTag } from "../resources";

export const CSS = {
  handle: "handle",
  handleSelected: "handle--selected",
};

export const ICONS = {
  drag: "drag",
} as const;

export const SUBSTITUTIONS = {
  itemLabel: "{itemLabel}",
  position: "{position}",
  total: "{total}",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isHandle = isTag("calcite-handle");
