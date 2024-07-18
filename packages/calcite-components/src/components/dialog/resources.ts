import { DialogPlacement } from "./interfaces";

export const CSS = {
  dialog: "dialog",
  panel: "panel",
  scrim: "scrim",
  container: "container",
  containerOpen: "container--open",
  containerEmbedded: "container--embedded",

  // these classes help apply the animation in phases to only set transform on open/close
  // this helps avoid a positioning issue for any floating-ui-owning children
  openingIdle: "dialog--opening-idle",
  openingActive: "dialog--opening-active",
  closingIdle: "dialog--closing-idle",
  closingActive: "dialog--closing-active",
};

export const SLOTS = {
  actionBar: "action-bar",
  alerts: "alerts",
  content: "content",
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

export const dialogStep = 25;
