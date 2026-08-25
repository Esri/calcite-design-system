import { isTag } from "../resources";

export const CSS = {
  accordion: "accordion",
  transparent: "accordion--transparent",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isAccordion = isTag("calcite-accordion");
