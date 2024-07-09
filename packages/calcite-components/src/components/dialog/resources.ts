export const CSS = {
  close: "close", //todo: remove
  dialog: "dialog",
  scrim: "scrim",
  container: "container",
  containerOpen: "container--open",
  slottedInShell: "slotted-in-shell",

  // these classes help apply the animation in phases to only set transform on open/close
  // this helps avoid a positioning issue for any floating-ui-owning children
  openingIdle: "modal--opening-idle",
  openingActive: "modal--opening-active",
  closingIdle: "modal--closing-idle",
  closingActive: "modal--closing-active",
};

export const SLOTS = {
  actionBar: "action-bar",
  content: "content",
  contentTop: "content-top",
  contentBottom: "content-bottom",
  headerActionsStart: "header-actions-start",
  headerActionsEnd: "header-actions-end",
  headerMenuActions: "header-menu-actions",
  headerContent: "header-content",
  fab: "fab",
  footer: "footer",
  footerActions: "footer-actions",
  footerEnd: "footer-end",
  footerStart: "footer-start",
};
