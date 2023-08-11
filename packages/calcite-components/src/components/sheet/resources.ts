export const CSS = {
  scrim: "scrim",
  container: "container",
  containerOpen: "container--open",
  content: "content",

  // these classes help apply the animation in phases to only set transform on open/close
  // this helps avoid a positioning issue for any floating-ui-owning children
  openingIdle: "modal--opening-idle",
  openingActive: "modal--opening-active",
  closingIdle: "modal--closing-idle",
  closingActive: "modal--closing-active",
};
