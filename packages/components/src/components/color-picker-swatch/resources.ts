import type { ColorPickerSwatch } from "./color-picker-swatch";

export const CSS = {
  swatch: "swatch",
  noColorSwatch: "swatch--no-color",
  checker: "checker",
};

export const COLORS = {
  borderLight: "rgba(0, 0, 0, 0.3)",
  borderDark: "rgba(255, 255, 255, 0.15)",
};

const checkerSquareSize = 4;

export const CHECKER_DIMENSIONS = {
  squareSize: checkerSquareSize,
  size: checkerSquareSize * 2,
};

export const IDS = {
  checker: "checker",
  shape: "shape",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isColorPickerSwatch(el: Element | null | EventTarget): el is ColorPickerSwatch["el"] {
  return (el as Element | null)?.tagName === "CALCITE-COLOR-PICKER-SWATCH";
}
