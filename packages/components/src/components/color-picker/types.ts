import type { ColorInstance } from "color";

export type ColorMode = "rgb" | "hsv";

export type Channels<N extends number | undefined = number | undefined> = [N, N, N, N];

// need to do this otherwise, stencil build doesn't pick up the type import
/** @internal */
export type InternalColor = ColorInstance;

/** @public */
export type ColorValue = string | RGB | RGBA | HSV | HSVA | HSL | HSLA;

/** @public */
export interface RGB {
  /** @public */
  r: number;
  /** @public */
  g: number;
  /** @public */
  b: number;
}

/** @public */
export type RGBA = RGB & ObjectWithAlpha;

/** @public */
interface ObjectWithAlpha {
  /** @public */
  a: number;
}

/** @public */
export interface HSV {
  /** @public */
  h: number;
  /** @public */
  s: number;
  /** @public */
  v: number;
}

/** @public */
export type HSVA = HSV & ObjectWithAlpha;

/** @public */
export interface HSL {
  /** @public */
  h: number;
  /** @public */
  s: number;
  /** @public */
  l: number;
}

/** @public */
export type HSLA = HSL & ObjectWithAlpha;
