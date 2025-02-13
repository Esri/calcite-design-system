import { Scale } from "../interfaces";

export const CSS = {
  container: "container",
  containerActive: "container--active",
  contentCenter: "content-center",
  description: "description",
  heading: "heading",
  iconEnd: "icon-end",
  iconStart: "icon-start",
  scale: (scale: Scale) => `scale--${scale}` as const,
} as const;

export const SLOTS = {
  contentEnd: "content-end",
  contentStart: "content-start",
} as const;
