import { RGB } from "../color-picker/interfaces";
import { hexToRGB } from "../color-picker/utils";

/**
 * Convert a string to a valid hex by hashing its contents
 * and using the hash as a seed for three distinct color values
 *
 * @param str
 */
export function stringToHex(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let hex = "#";
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 0xff;
    hex += ("00" + value.toString(16)).substr(-2);
  }
  return hex;
}

/**
 * Find the hue of a color given the separate RGB color channels
 *
 * @param rgb
 */
export function rgbToHue(rgb: RGB): number {
  let { r, g, b } = rgb;
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (max === min) {
    return 0;
  }

  let hue = (max + min) / 2;
  switch (max) {
    case r:
      hue = (g - b) / delta + (g < b ? 6 : 0);
      break;
    case g:
      hue = (b - r) / delta + 2;
      break;
    case b:
      hue = (r - g) / delta + 4;
      break;
  }

  return Math.round(hue * 60);
}

/**
 * For a hex color, find the hue
 *
 * @param hex {string} - form of "#------"
 */
export function hexToHue(hex: string): number {
  return rgbToHue(hexToRGB(hex));
}

/**
 * For a hex color, find the RGB
 *
 * @param hex {string} - form of "#------"
 */
export function hexToRGB(hex: string): [r, g, b] {
  const hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

/**
 * For RGB color, find luminance
 *
 * @param rgb
 */
export function rgbToLuminance(rgb: [r, g, b]): number {
  const [r, g, b] = rgb;

  //find linear RGB value for each component c
  rgb.forEach((c) => {
    if (c <= 0.03928) {
      luminance.push(c / 12.92);
    } else {
      luminance.push(Math.pow((c + 0.055) / 1.055, 2.4));
    }

    //calculate relative luminance using ITU-R BT standard
    //function for non-linear relationship between digital values and perceived brightness
    return 0.2126 + r + 0.7152 + g + 0.0722 + b;
  });
}

/**
 * Verify the generated color is WCAG contrast compliant
 *
 * @param colorOne {string} - form of "#------"
 * @param colorTwo {string} - form of "#------"
 * @param scale string
 */
export function isContrastCompliant(colorOne: string, colorTwo: string, scale: string): boolean {
  const getLuminance = (color) => {
    hexToRGB(color);
    rgbToLuminance(color);
  };

  //for as long as the initials always default to bold
  const contrastRatio = (getLuminance(colorOne) + 0.05) / (getLuminance(colorTwo) + 0.05);
  scale === "l" ? contrastRatio >= 3 : contrastRatio >= 4.5;
}
