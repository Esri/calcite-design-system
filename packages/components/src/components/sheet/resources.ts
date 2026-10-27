import { isTag } from "../resources";
import { IconName } from "../icon/types";

export const CSS = {
  assistiveText: "assistive-text",
  scrim: "scrim",
  container: "container",
  containerOpen: "container--open",
  content: "content",
  panel: "panel",
  contentContainer: "content-container",
  containerEmbedded: "container--embedded",
  resizeHandle: "resize-handle",
  resizeHandleBar: "resize-handle-bar",
  height: "height",
};

export const IDS = {
  sheetContent: "sheet-content",
};

export const ICONS: Record<string, IconName> = {
  dragVertical: "drag-resize-vertical",
  dragHorizontal: "drag-resize-horizontal",
};

export const SLOTS = {
  actionBar: "action-bar",
  alerts: "alerts",
  content: "content",
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

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isSheet = isTag("calcite-sheet");
