import { isTag } from "../resources";

export const CSS = {
  main: "main",
  content: "content",
  contentBehind: "content--behind",
  contentBottom: "content-bottom",
  contentNonInteractive: "content--non-interactive",
  hasActionBarPositionPanel: "has-action-bar-position-panel",
  hasResizablePanelBottom: "has-resizable-panel-bottom",
  hasResizablePanelTop: "has-resizable-panel-top",
  footer: "footer",
  positionedSlotWrapper: "positioned-slot-wrapper",
  container: "container",
  contentBehindCenterContent: "center-content",
};

export const SLOTS = {
  panelStart: "panel-start",
  panelEnd: "panel-end",
  panelTop: "panel-top",
  panelBottom: "panel-bottom",
  header: "header",
  footer: "footer",
  alerts: "alerts",
  sheets: "sheets",
  dialogs: "dialogs",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isShell = isTag("calcite-shell");
