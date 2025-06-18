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

export const initialDragPosition: DialogDragPosition = { x: null, y: null };
export const initialResizePosition: DialogResizePosition = { top: null, right: null, bottom: null, left: null };
