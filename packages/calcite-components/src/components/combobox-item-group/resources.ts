import { Scale } from "../interfaces";

export const CSS = {
  list: "list",
  label: "label",
  title: "title",
  scale: (scale: Scale) => `scale--${scale}` as const,
};
