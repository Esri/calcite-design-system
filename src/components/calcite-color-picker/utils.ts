export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

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
