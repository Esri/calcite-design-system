import { Scale } from "../interfaces";

export const CSS = {
  container: "container",
  containerNoSpacing: "container--no-spacing",
  firstTitle: "first-title",
  heading: "heading",
  scale: (scale: Scale) => `scale--${scale}` as const,
  separator: "separator",
};
