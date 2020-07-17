import { ColorValue, RGB, HSV, RGBA, HSVA, HSLA } from "../../interfaces/ColorPicker";
import Color from "color";

/**
 * taken from https://github.com/dojo/dojox/blob/master/color/_base.js#L92-L125
 * @private
 */
export function hsvToRGB(hsb: HSV): RGB {
  let saturation = hsb.s,
    value = hsb.v,
    hue = hsb.h;

  if (hue == 360) {
    hue = 0;
  }
  saturation /= 100;
  value /= 100;

  let r, g, b;
  if (saturation == 0) {
    (r = value), (b = value), (g = value);
  } else {
    let hTemp = hue / 60,
      i = Math.floor(hTemp),
      f = hTemp - i;
    let p = value * (1 - saturation);
    let q = value * (1 - saturation * f);
    let t = value * (1 - saturation * (1 - f));
    switch (i) {
      case 0: {
        (r = value), (g = t), (b = p);
        break;
      }
      case 1: {
        (r = q), (g = value), (b = p);
        break;
      }
      case 2: {
        (r = p), (g = value), (b = t);
        break;
      }
      case 3: {
        (r = p), (g = q), (b = value);
        break;
      }
      case 4: {
        (r = t), (g = p), (b = value);
        break;
      }
      case 5: {
        (r = value), (g = p), (b = q);
        break;
      }
    }
  }

  return {
    r: Math.round((r as number) * 255),
    g: Math.round((g as number) * 255),
    b: Math.round((b as number) * 255)
  };
}

/**
 * taken from https://github.com/dojo/dojox/blob/master/color/_base.js#L171-L192
 * @private
 */
export function rgbToHSV(rgb: RGB): HSV {
  let r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255;
  let min = Math.min(r, b, g),
    max = Math.max(r, g, b);
  let delta = max - min;
  let h = null,
    s = max == 0 ? 0 : delta / max;
  if (s == 0) {
    h = 0;
  } else {
    if (r == max) {
      h = (60 * (g - b)) / delta;
    } else if (g == max) {
      h = 120 + (60 * (b - r)) / delta;
    } else {
      h = 240 + (60 * (r - g)) / delta;
    }

    if (h < 0) {
      h += 360;
    }
  }
  return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(max * 100) };
}

export function rgbToHex(color: RGB): string {
  const { r, g, b } = color;

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
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

type CSSColorMode = "hex" | "hexa" | "rgb-css" | "rgba-css" | "hsl-css" | "hsla-css";
type ObjectColorMode = "rgb" | "rgba" | "hsl" | "hsla" | "hsv" | "hsva";
export type SupportedMode = CSSColorMode | ObjectColorMode;

export function parseMode(colorValue: ColorValue): SupportedMode | null {
  if (typeof colorValue === "string") {
    if (colorValue.startsWith("#")) {
      const { length } = colorValue;

      if (length === 4 || length === 7) {
        return "hex";
      }
      if (length === 5 || length === 9) {
        return "hexa";
      }
    }

    if (colorValue.startsWith("rgba(")) {
      return "rgba-css";
    }

    if (colorValue.startsWith("rgb(")) {
      return "rgb-css";
    }

    if (colorValue.startsWith("hsl(")) {
      return "hsl-css";
    }

    if (colorValue.startsWith("hsla(")) {
      return "hsla-css";
    }
  }

  if (typeof colorValue === "object") {
    if (hasChannels(colorValue, "r", "g", "b")) {
      return hasChannels(colorValue, "a") ? "rgba" : "rgb";
    }

    if (hasChannels(colorValue, "h", "s", "l")) {
      return hasChannels(colorValue, "a") ? "hsla" : "hsl";
    }

    if (hasChannels(colorValue, "h", "s", "v")) {
      return hasChannels(colorValue, "a") ? "hsva" : "hsv";
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

export function createColor(value: ColorValue): Color {
  return Color(value).round();
}

// TODO: use conditional typing
export function colorValueEqual(value1: ColorValue, value2: ColorValue, mode: SupportedMode): boolean {
  if (mode.startsWith("hex") || mode.endsWith("-css")) {
    value1 = value1 as string;
    value2 = value2 as string;
    return value1.toLowerCase() === value2.toLowerCase();
  }

  if (mode.startsWith("rgb")) {
    return (
      (value1 as RGBA).r === (value2 as RGBA).r &&
      (value1 as RGBA).g === (value2 as RGBA).g &&
      (value1 as RGBA).b === (value2 as RGBA).b &&
      (value1 as RGBA).a === (value2 as RGBA).a
    );
  }

  if (mode.startsWith("hsv")) {
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
