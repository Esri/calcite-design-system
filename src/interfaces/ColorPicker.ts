import type Color from "color";

export type ColorMode = "rgb" | "hsv";

// need to do this otherwise, stencil build doesn't pick up the type import
export type InternalColor = Color;
