import { ColorValue, RGB, RGBA, HSVA, HSLA } from "../../interfaces/Color";
import Color from "color";

export function rgbToHex(color: RGB): string {
  const { r, g, b } = color;

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
    .toString(16)
    .padStart(2, "0")}`.toLowerCase();
}

export const hexChar: RegExp = /^[0-9A-F]{1}$/i;
const shortHandHex: RegExp = /^#[0-9A-F]{3}$/i;
const longhandHex: RegExp = /^#[0-9A-F]{6}$/i;

export function isValidHex(hex: string): boolean {
  return isShorthandHex(hex) || isLonghandHex(hex);
}

export function isShorthandHex(hex: string): boolean {
  return hex && hex.length === 4 && shortHandHex.test(hex);
}

export function isLonghandHex(hex: string): boolean {
  return hex && hex.length === 7 && longhandHex.test(hex);
}

export function normalizeHex(hex: string): string {
  hex = hex.toLowerCase();

  if (!hex.startsWith("#")) {
    hex = `#${hex}`;
  }

  if (isShorthandHex(hex)) {
    return rgbToHex(hexToRGB(hex));
  }

  return hex;
}

export function hexToRGB(hex: string): RGB {
  if (!isValidHex(hex)) {
    return null;
  }

  hex = hex.replace("#", "");

  if (hex.length === 3) {
    const [first, second, third] = hex.split("");

    const r = parseInt(`${first}${first}`, 16);
    const g = parseInt(`${second}${second}`, 16);
    const b = parseInt(`${third}${third}`, 16);

    return { r, g, b };
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  return { r, g, b };
}

export enum CSSColorMode {
  HEX = "hex",
  HEXA = "hexa",
  RGB_CSS = "rgb-css",
  RGBA_CSS = "rgba-css",
  HSL_CSS = "hsl-css",
  HSLA_CSS = "hsla-css"
}

export enum ObjectColorMode {
  RGB = "rgb",
  RGBA = "rgba",
  HSL = "hsl",
  HSLA = "hsla",
  HSV = "hsv",
  HSVA = "hsva"
}

export type SupportedMode = CSSColorMode | ObjectColorMode;

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

function hasChannels(colorObject: object, ...channels: string[]): boolean {
  return channels.every((channel) => `${channel}` in colorObject);
}

export function colorEqual(value1: Color, value2: Color): boolean {
  return value1.rgbNumber() === value2.rgbNumber();
}

export function colorValueEqual(value1: ColorValue, value2: ColorValue, mode: SupportedMode): boolean {
  if (
    mode === CSSColorMode.HEX ||
    mode === CSSColorMode.HEXA ||
    mode === CSSColorMode.RGB_CSS ||
    mode === CSSColorMode.RGBA_CSS ||
    mode === CSSColorMode.HSL_CSS ||
    mode === CSSColorMode.HSLA_CSS
  ) {
    return (value1 as string).toLowerCase() === (value2 as string).toLowerCase();
  }

  if (mode === ObjectColorMode.RGB || mode === ObjectColorMode.RGBA) {
    return (
      (value1 as RGBA).r === (value2 as RGBA).r &&
      (value1 as RGBA).g === (value2 as RGBA).g &&
      (value1 as RGBA).b === (value2 as RGBA).b &&
      (value1 as RGBA).a === (value2 as RGBA).a
    );
  }

  if (mode === ObjectColorMode.HSV || mode === ObjectColorMode.HSVA) {
    return (
      (value1 as HSVA).h === (value2 as HSVA).h &&
      (value1 as HSVA).s === (value2 as HSVA).s &&
      (value1 as HSVA).v === (value2 as HSVA).v &&
      (value1 as HSVA).a === (value2 as HSVA).a
    );
  }

  return (
    (value1 as HSLA).h === (value2 as HSLA).h &&
    (value1 as HSLA).s === (value2 as HSLA).s &&
    (value1 as HSLA).l === (value2 as HSLA).l &&
    (value1 as HSLA).a === (value2 as HSLA).a
  );
}
