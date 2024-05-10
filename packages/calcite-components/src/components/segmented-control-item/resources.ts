import { Scale } from "../interfaces";

export const SLOTS = {
  input: "input",
};

export const CSS = {
  label: "label",
  labelScale: (scale: Scale) => `label--scale-${scale}` as const,
  labelHorizontal: "label--horizontal",
  labelOutline: "label--outline",
  labelOutlineFill: "label--outline-fill",
  segmentedControlItemIcon: "segmented-control-item-icon",
  segmentedControlItemIconLone: "segmented-control-item-icon--lone",
};
