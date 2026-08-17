import { DialogDragPosition, DialogPlacement, DialogResizePosition } from "./types";

export const CSS = {
  dialog: "dialog",
  panel: "panel",
  scrim: "scrim",
  container: "container",
  containerOpen: "container--open",
  containerEmbedded: "container--embedded",
  assistiveText: "assistive-text",
};

export const SLOTS = {
  actionBar: "action-bar",
  alerts: "alerts",
  customContent: "custom-content",
  contentTop: "content-top",
  contentBottom: "content-bottom",
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  description: "description",
  heading: "heading",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerStart: "footer-start",
  footerEnd: "footer-end",
};

export const dialogPlacements: DialogPlacement[] = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "cover",
  "center",
];

export const initialDragPosition: DialogDragPosition = { x: 0, y: 0 };
export const initialResizePosition: DialogResizePosition = { top: 0, right: 0, bottom: 0, left: 0 };
