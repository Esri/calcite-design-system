import type { ColorPickerHexInput } from "./color-picker-hex-input";

export const CSS = {
  container: "container",
  hexInput: "hex-input",
  opacityInput: "opacity-input",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isColorPickerHexInput(el: Element | null | EventTarget): el is ColorPickerHexInput["el"] {
  return (el as Element | null)?.tagName === "CALCITE-COLOR-PICKER-HEX-INPUT";
}
