export const CSS = {
  wrapper: "wrapper",
  wrapperBordered: "wrapper--bordered",
  container: "container",
  containerHover: "container--hover",
  containerBorder: "container--border",
  containerBorderSelected: "container--border-selected",
  containerBorderUnselected: "container--border-unselected",
  contentContainerWrapper: "content-container-wrapper",
  contentContainerWrapperBordered: "content-container-wrapper--bordered",
  contentContainer: "content-container",
  contentContainerUnavailable: "content-container--unavailable",
  contentContainerSelectable: "content-container--selectable",
  contentContainerHasCenterContent: "content-container--has-center-content",
  nestedContainer: "nested-container",
  nestedContainerExpanded: "nested-container--expanded",
  content: "content",
  row: "row",
  gridCell: "grid-cell",
  customContent: "custom-content",
  actionsStart: "actions-start",
  contentStart: "content-start",
  label: "label",
  description: "description",
  contentEnd: "content-end",
  contentBottom: "content-bottom",
  actionsEnd: "actions-end",
  selectionContainer: "selection-container",
  selectionContainerSingle: "selection-container--single",
  expandedContainer: "expanded-container",
  dragContainer: "drag-container",
  collapse: "collapse",
  icon: "icon",
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
  selectedMultiple: "check-square-f",
  selectedSingle: "circle-inset-large",
  unselectedMultiple: "square",
  unselectedSingle: "circle",
  collapsedLTR: "chevron-right",
  collapsedRTL: "chevron-left",
  open: "chevron-down",
  blank: "blank",
  close: "x",
} as const;

export const activeCellTestAttribute = "data-test-active";
