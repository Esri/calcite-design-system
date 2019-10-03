import Popper from "popper.js";

export const CSS = {
  container: "container",
  containerOpen: "container--open",
  image: "image",
  closeButton: "close-button",
  content: "content"
};

export type TooltipInteraction = "hover" | "click";

export type TooltipPlacement = Popper.Placement;
