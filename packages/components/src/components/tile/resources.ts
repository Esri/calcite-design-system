import type { Tile } from "./tile";

import { IconName } from "../icon/types";

export const CSS = {
  container: "container",
  contentContainer: "content-container",
  contentContainerHasContent: "content-container--has-content",
  contentContainerHasOnlyContentTopAndBottom: "content-container--has-only-content-top-and-bottom",
  textContentContainer: "text-content-container",
  description: "description",
  heading: "heading",
  icon: "icon",
  interactive: "interactive",
  largeVisualDeprecated: "large-visual-deprecated",
  row: "row",
  selected: "selected",
  selectionIcon: "selection-icon",
  textContent: "text-content",
};

export const ICONS: Record<string, IconName> = {
  selectedMultiple: "check-square-f",
  selectedSingle: "circle-f",
  unselectedMultiple: "square",
  unselectedSingle: "circle",
};

export const SLOTS = {
  contentBottom: "content-bottom",
  contentTop: "content-top",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isTile(el: Element | null | EventTarget): el is Tile["el"] {
  return (el as Element | null)?.tagName === "CALCITE-TILE";
}
