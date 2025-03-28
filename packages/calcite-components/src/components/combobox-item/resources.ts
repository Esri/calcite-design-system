import { Scale } from "../interfaces";

export const CSS = {
  active: "label--active",
  centerContent: "center-content",
  container: "container",
  iconCustom: "icon--custom",
  description: "description",
  icon: "icon",
  label: "label",
  scale: (scale: Scale) => `scale--${scale}` as const,
  shortText: "short-text",
  single: "label--single",
  textContainer: "text-container",
  heading: "heading",
};

export const SLOTS = {
  contentEnd: "content-end",
  contentStart: "content-start",
};
