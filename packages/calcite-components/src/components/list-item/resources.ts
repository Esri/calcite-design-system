import { IconName } from "../icon/interfaces";

export const CSS = {
  actionsEnd: "actions-end",
  actionsStart: "actions-start",
  description: "description",
  close: "close",
  collapsed: "collapsed",
  container: "container",
  containerHover: "container--hover",
  containerBorder: "container--border",
  containerBorderSelected: "container--border-selected",
  containerBorderUnselected: "container--border-unselected",
  content: "content",
  contentBottom: "content-bottom",
  contentContainer: "content-container",
  contentContainerHasCenterContent: "content-container--has-center-content",
  contentContainerSelectable: "content-container--selectable",
  contentContainerUnavailable: "content-container--unavailable",
  contentContainerWrapper: "content-container-wrapper",
  contentContainerWrapperBordered: "content-container-wrapper--bordered",
  contentEnd: "content-end",
  contentStart: "content-start",
  customContent: "custom-content",
  expandedContainer: "expanded-container",
  dragContainer: "drag-container",
  gridCell: "grid-cell",
  icon: "icon",
  nestedContainer: "nested-container",
  nestedContainerExpanded: "nested-container--expanded",
  label: "label",
  row: "row",
  selectionContainer: "selection-container",
  selectionContainerSingle: "selection-container--single",
  wrapper: "wrapper",
  wrapperBordered: "wrapper--bordered",
};

export const SLOTS = {
  actionsStart: "actions-start",
  contentStart: "content-start",
  content: "content",
  contentBottom: "content-bottom",
  contentEnd: "content-end",
  actionsEnd: "actions-end",
};

// Set to zero to extend until the end of the table section.
export const MAX_COLUMNS = 0;

export const ICONS = {
  selectedMultiple: "check-square-f" as IconName,
  selectedSingle: "circle-inset-large" as IconName,
  unselectedMultiple: "square" as IconName,
  unselectedSingle: "circle" as IconName,
  collapsedLTR: "chevron-right" as IconName,
  collapsedRTL: "chevron-left" as IconName,
  open: "chevron-down" as IconName,
  blank: "blank" as IconName,
  close: "x" as IconName,
};

export const activeCellTestAttribute = "data-test-active";
