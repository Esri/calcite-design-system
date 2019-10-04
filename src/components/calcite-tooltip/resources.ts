import Popper from "popper.js";

export const CSS = {
  container: "container",
  containerOpen: "container--open",
  imageContainer: "image-container",
  closeButton: "close-button",
  content: "content",
  contentFont: "font-size-3",
  message: "message"
};

export type TooltipInteraction = "hover" | "click";

export type TooltipPlacement = Popper.Placement;
