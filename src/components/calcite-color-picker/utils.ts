import { ColorValue, RGB, InternalColor, RGBA } from "./interfaces";

import Color from "color";
import colorString from "color-string";

export const hexChar = /^[0-9A-F]$/i;
const shorthandHex = /^#[0-9A-F]{3}$/i;
const longhandHex = /^#[0-9A-F]{6}$/i;
const shorthandHexWithAlpha = /^#[0-9A-F]{4}$/i;
const longhandHexWithAlpha = /^#[0-9A-F]{8}$/i;

export const alphaToOpacity = (alpha: number): number => Number((alpha * 100).toFixed());

export const opacityToAlpha = (opacity: number): number => Number((opacity / 100).toFixed(2));

export function isValidHex(hex: string, hasAlpha = false): boolean {
  return isShorthandHex(hex, hasAlpha) || isLonghandHex(hex, hasAlpha);
}

function evaluateHex(hex: string, length: number, pattern: RegExp): boolean {
  if (!hex) {
    return false;
  }

  return hex.length === length && pattern.test(hex);
}

export function isShorthandHex(hex: string, hasAlpha = false): boolean {
  const hexLength = hasAlpha ? 5 : 4;
  const hexPattern = hasAlpha ? shorthandHexWithAlpha : shorthandHex;

  return evaluateHex(hex, hexLength, hexPattern);
}

export function isLonghandHex(hex: string, hasAlpha = false): boolean {
  const hexLength = hasAlpha ? 9 : 7;
  const hexPattern = hasAlpha ? longhandHexWithAlpha : longhandHex;

  return evaluateHex(hex, hexLength, hexPattern);
}

export function normalizeHex(hex: string): string {
  hex = hex.toLowerCase();

  if (!hex.startsWith("#")) {
    hex = `#${hex}`;
  }

  return hex;
}

interface PatchedColor extends InternalColor {
  hexa(): string;
}

export function hexify(color: Color, alphaSupport = false): string {
  return alphaSupport ? (color as PatchedColor).hexa() : color.hex();
}

export function rgbToHex(color: RGB | RGBA): string {
  const { r, g, b } = color;

  const rChars = numToHex(r);
  const gChars = numToHex(g);
  const bChars = numToHex(b);
  const alphaChars = "a" in color ? numToHex(color.a * 255) : "";

  return `#${rChars}${gChars}${bChars}${alphaChars}`.toLowerCase();
}

function numToHex(num: number): string {
  return num.toString(16).padStart(2, "0");
}

export function normalizeAlpha(colorObject: ReturnType<Color["object"]>): RGBA {
  return {
    r: colorObject.r,
    g: colorObject.g,
    b: colorObject.b,
    a: colorObject.alpha ?? 1 // color will omit alpha if 1
  };
}

export function hexToRGB(hex: string, hasAlpha = false): RGB | RGBA {
  if (!isValidHex(hex, hasAlpha)) {
    return null;
  }

  hex = hex.replace("#", "");

  let r: number, g: number, b: number, a: number;
  const isShorthand = hex.length === 3 || hex.length === 4;

  if (isShorthand) {
    const [first, second, third, fourth] = hex.split("");

    r = parseInt(`${first}${first}`, 16);
    g = parseInt(`${second}${second}`, 16);
    b = parseInt(`${third}${third}`, 16);
    a = parseInt(`${fourth}${fourth}`, 16);
  } else {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
    a = parseInt(hex.slice(6, 8), 16);
  }

  return isNaN(a) ? { r, g, b } : { r, g, b, a };
}

// these utils allow users to pass enum values as strings without having to access the enum
// based on the approach suggested by https://github.com/microsoft/TypeScript/issues/17690#issuecomment-321365759,
const enumify = <T extends { [index: string]: U }, U extends string>(x: T) => x;
type Enumify<T> = T[keyof T];

export const CSSColorMode = enumify({
  HEX: "hex",
  HEXA: "hexa",
  RGB_CSS: "rgb-css",
  RGBA_CSS: "rgba-css",
  HSL_CSS: "hsl-css",
  HSLA_CSS: "hsla-css"
});
type CSSColorMode = Enumify<typeof CSSColorMode>;

export const ObjectColorMode = enumify({
  RGB: "rgb",
  RGBA: "rgba",
  HSL: "hsl",
  HSLA: "hsla",
  HSV: "hsv",
  HSVA: "hsva"
});
type ObjectColorMode = Enumify<typeof ObjectColorMode>;

export type SupportedMode = CSSColorMode | ObjectColorMode;

export type Format = "auto" | SupportedMode;

export function parseMode(colorValue: ColorValue): SupportedMode | null {
  if (typeof colorValue === "string") {
    if (colorValue.startsWith("#")) {
      const { length } = colorValue;

      if (length === 4 || length === 7) {
        return CSSColorMode.HEX;
      }
      if (length === 5 || length === 9) {
        return CSSColorMode.HEXA;
      }
    }

    if (colorValue.startsWith("rgba(")) {
      return CSSColorMode.RGBA_CSS;
    }

    if (colorValue.startsWith("rgb(")) {
      return CSSColorMode.RGB_CSS;
    }

    if (colorValue.startsWith("hsl(")) {
      return CSSColorMode.HSL_CSS;
    }

    if (colorValue.startsWith("hsla(")) {
      return CSSColorMode.HSLA_CSS;
    }
  }

  if (typeof colorValue === "object") {
    if (hasChannels(colorValue, "r", "g", "b")) {
      return hasChannels(colorValue, "a") ? ObjectColorMode.RGBA : ObjectColorMode.RGB;
    }

    if (hasChannels(colorValue, "h", "s", "l")) {
      return hasChannels(colorValue, "a") ? ObjectColorMode.HSLA : ObjectColorMode.HSL;
    }

    if (hasChannels(colorValue, "h", "s", "v")) {
      return hasChannels(colorValue, "a") ? ObjectColorMode.HSVA : ObjectColorMode.HSV;
    }
  }

  return null;
}

function hasChannels(colorObject: Exclude<ColorValue, string> | null, ...channels: string[]): boolean {
  return channels.every((channel) => channel && colorObject && `${channel}` in colorObject);
}

export function colorEqual(value1: Color | null, value2: Color | null): boolean {
  return value1?.rgb().array().toString() === value2?.rgb().array().toString();
}

type ColorConstructorParams = ConstructorParameters<typeof Color>;

interface ColorContext extends Color {
  color: number[];
  valpha: number;
}

// based on https://github.com/Qix-/color/pull/158/
function hexa(this: ColorContext, value: ColorConstructorParams[0]): string | Color {
  if (arguments.length) {
    return new Color(value);
  }

  const hexa = colorString.to.hex((this.rgb().round() as ColorContext).color, this.valpha);
  return hexa.length == 9 ? hexa : hexa + "FF";
}

Color.prototype.hexa = hexa;

export function createColor(object?: ColorConstructorParams[0], model?: ColorConstructorParams[1]): Color {
  return Color(object, model);
}
