import { isTag } from "../resources";
import { Scale } from "../types";

export const CSS = {
  container: "container",
  containerNoSpacing: "container--no-spacing",
  firstTitle: "first-title",
  heading: "heading",
  scale: (scale: Scale) => `scale--${scale}` as const,
  separator: "separator",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isAutocompleteItemGroup = isTag("calcite-autocomplete-item-group");
