import { Scale } from "../interfaces";

export const CSS = {
  active: "label--active",
  centerContent: "center-content",
  container: "container",
  custom: "icon--custom",
  description: "description",
  icon: "icon",
  iconSelected: "icon--selected",
  label: "label",
  scale: (scale: Scale) => `scale--${scale}` as const,
  selected: "label--selected",
  shortText: "short-text",
  single: "label--single",
  textContainer: "text-container",
  title: "title",
};

export const SLOTS = {
  contentEnd: "content-end",
  contentStart: "content-start",
};
