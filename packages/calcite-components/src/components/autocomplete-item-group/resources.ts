import { Scale } from "../interfaces";

export const CSS = {
  container: "container",
  containerNoSpacing: "container--no-spacing",
  heading: "heading",
  scale: (scale: Scale) => `scale--${scale}` as const,
};
