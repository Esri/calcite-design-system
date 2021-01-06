import { ColorValue, RGB } from "./interfaces";
import Color from "color";

export function rgbToHex(color: RGB): string {
  const { r, g, b } = color;

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b
    .toString(16)
    .padStart(2, "0")}`.toLowerCase();
}

export const hexChar = /^[0-9A-F]{1}$/i;
const shortHandHex = /^#[0-9A-F]{3}$/i;
const longhandHex = /^#[0-9A-F]{6}$/i;

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
  return value1?.rgbNumber() === value2?.rgbNumber();
}
