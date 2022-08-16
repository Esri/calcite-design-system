import type Color from "color";

export type ColorAppearance = "default" | "minimal";

export type ColorMode = "rgb" | "hsv";

// need to do this otherwise, stencil build doesn't pick up the type import
export type InternalColor = Color;

export type ColorValue = string | RGB | RGBA | HSV | HSVA | HSL | HSLA;

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export type RGBA = RGB & ObjectWithAlpha;

interface ObjectWithAlpha {
  a: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export type HSVA = HSV & ObjectWithAlpha;

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export type HSLA = HSL & ObjectWithAlpha;
