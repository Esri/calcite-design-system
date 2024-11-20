import { Scale } from "../interfaces";

export const CSS = {
  container: "container",
  containerActive: "container--active",
  scale: (scale: Scale) => `scale--${scale}` as const,
  content: "content",
  heading: "heading",
  description: "description",
  iconStart: "icon-start",
  iconEnd: "icon-end",
} as const;

export const SLOTS = {
  contentStart: "content-start",
  contentEnd: "content-end",
} as const;
