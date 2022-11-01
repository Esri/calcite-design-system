export const CSS = {
  modal: "modal",
  modalOpen: "modal--open",
  title: "title",
  header: "header",
  footer: "footer",
  scrim: "scrim",
  back: "back",
  close: "close",
  secondary: "secondary",
  primary: "primary",
  overflowHidden: "overflow-hidden",

  // these classes help apply the animation in phases to only set transform on open/close
  // this helps avoid a positioning issue for any floating-ui-owning children
  openingIdle: "modal--opening-idle",
  openingActive: "modal--opening-active",
  closingIdle: "modal--closing-idle",
  closingActive: "modal--closing-active"
};

export const ICONS = {
  close: "x"
};

export const SLOTS = {
  content: "content",
  header: "header",
  back: "back",
  secondary: "secondary",
  primary: "primary"
};

export const TEXT = {
  close: "Close"
};

export const ANIMATION_TIMEOUT = 300;
