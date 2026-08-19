import type { ShellPanel } from "./shell-panel";

import { IconName } from "../icon/types";

export const CSS = {
  container: "container",
  actionBarContainer: "action-bar-container",
  contentContainer: "content-container",
  content: "content",
  contentActionBarExpanded: "content--action-bar-expanded",
  contentHeader: "content__header",
  contentBody: "content__body",
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
  header: "header",
};

export const ICONS: Record<string, IconName> = {
  dragVertical: "drag-resize-vertical",
  dragHorizontal: "drag-resize-horizontal",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isShellPanel(el: Element | null | EventTarget): el is ShellPanel["el"] {
  return (el as Element | null)?.tagName === "CALCITE-SHELL-PANEL";
}
