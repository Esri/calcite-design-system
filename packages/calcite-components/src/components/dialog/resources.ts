export const CSS = {
  // todo: cleanup
  modal: "modal",
  title: "title",
  header: "header",
  footer: "footer",
  scrim: "scrim",
  back: "back",
  close: "close",
  secondary: "secondary",
  primary: "primary",
  container: "container",
  containerOpen: "container--open",
  content: "content",
  contentNoFooter: "content--no-footer",
  contentBottom: "content-bottom",
  contentTop: "content-top",
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
