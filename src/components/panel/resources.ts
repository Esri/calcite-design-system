export const CSS = {
  backButton: "back-button",
  container: "container",
  header: "header",
  heading: "heading",
  summary: "summary",
  description: "description",
  headerContent: "header-content",
  headerActions: "header-actions",
  headerActionsEnd: "header-actions--end",
  headerActionsStart: "header-actions--start",
  contentWrapper: "content-wrapper",
  contentContainer: "content-container",
  contentHeight: "content-height",
  fabContainer: "fab-container",
  footer: "footer"
};

export const ICONS = {
  close: "x",
  menu: "ellipsis",
  backLeft: "chevron-left",
  backRight: "chevron-right"
};

export const SLOTS = {
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerActions: "footer-actions"
};

export const TEXT = {
  back: "Back",
  close: "Close",
  open: "Open",
  options: "Options"
};

export const HEADING_LEVEL = 3;

/**
 * There is no need for using focusId anymore. The appropriate element will be focused.
 *
 * @deprecated
 */
export type DeprecatedFocusId = "dismiss-button" | "back-button";
