import { isTag } from "../resources";

export const CSS = {
  container: "container",
  hexInput: "hex-input",
  opacityInput: "opacity-input",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export const isColorPickerHexInput = isTag("calcite-color-picker-hex-input");
