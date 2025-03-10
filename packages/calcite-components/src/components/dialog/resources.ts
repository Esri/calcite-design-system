import { DialogDragPosition, DialogPlacement, DialogResizePosition } from "./interfaces";

export const CSS = {
  dialog: "dialog",
  panel: "panel",
  scrim: "scrim",
  container: "container",
  containerOpen: "container--open",
  containerEmbedded: "container--embedded",
  assistiveText: "assistive-text",
  openingActive: "dialog--opening-active",
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

export const dialogResizeStep = 25;
export const dialogDragStep = 25;
export const initialDragPosition: DialogDragPosition = { x: 0, y: 0 };
export const initialResizePosition: DialogResizePosition = { top: 0, right: 0, bottom: 0, left: 0 };
