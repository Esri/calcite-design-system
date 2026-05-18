import { IconName } from "../icon/interfaces";

export const CSS = {
  container: "container",
  actionBarContainer: "action-bar-container",
  contentContainer: "content-container",
  content: "content",
  panel: "panel",
  contentOverlay: "content--overlay",
  float: "float",
  floatAll: "float-all",
  floatContent: "float--content",
  resizeHandle: "resize-handle",
  resizeHandleBar: "resize-handle-bar",
  height: "height",
};

export const SLOTS = {
  actionBar: "action-bar",
  panelActionBar: "panel-action-bar",
  alerts: "alerts",
  customContent: "custom-content",
  contentTop: "content-top",
  contentBottom: "content-bottom",
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerStart: "footer-start",
  footerEnd: "footer-end",
};

export const ICONS: Record<string, IconName> = {
  dragVertical: "drag-resize-vertical",
  dragHorizontal: "drag-resize-horizontal",
};
