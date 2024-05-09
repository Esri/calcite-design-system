import { Scale } from "../interfaces";

export const SLOTS = {
  input: "input",
};

export const CSS = {
  segmentedControlItemIcon: "segmented-control-item-icon",
  label: "label",
  labelScale: (scale: Scale) => `label--scale-${scale}` as const,
  labelHorizontal: "label--horizontal",
  labelOutline: "label--outline",
  labelOutlineFill: "label--outline-fill",
};
