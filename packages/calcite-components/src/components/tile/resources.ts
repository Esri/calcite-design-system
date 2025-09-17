import { IconName } from "../icon/interfaces";

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

export const ICONS = {
  selectedMultiple: "check-square-f" as IconName,
  selectedSingle: "circle-f" as IconName,
  unselectedMultiple: "square" as IconName,
  unselectedSingle: "circle" as IconName,
};

export const SLOTS = {
  contentBottom: "content-bottom",
  contentEnd: "content-end",
  contentStart: "content-start",
  contentTop: "content-top",
};
