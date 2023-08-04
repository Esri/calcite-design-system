export const CSS = {
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

export const DURATIONS = {
  slow: 14000,
  medium: 10000,
  fast: 6000,
  test: 300 / 1000,
};

export const ICONS = {
  close: "x",
};

export const SLOTS = {
  content: "content",
  contentBottom: "content-bottom",
  contentTop: "content-top",
  header: "header",
  back: "back",
  secondary: "secondary",
  primary: "primary",
};
