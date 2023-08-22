export const CSS = {
  scrim: "scrim",
  container: "container",
  containerOpen: "container--open",
  content: "content",

  // these classes help apply the animation in phases to only set transform on open/close
  // this helps avoid a positioning issue for any floating-ui-owning children
  openingIdle: "content--opening-idle",
  openingActive: "content--opening-active",
  closingIdle: "content--closing-idle",
  closingActive: "content--closing-active",

  slottedInShell: "slotted-in-shell",
};
