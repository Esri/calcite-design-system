import Popper from "popper.js";

export const CSS = {
  arrow: "arrow",
  container: "container",
  containerOpen: "container--open",
  imageContainer: "image-container",
  closeButton: "close-button",
  content: "content"
};

export type TooltipInteraction = "hover" | "click";

export type TooltipPlacement = Popper.Placement;
