import { RGB } from "../color-picker/interfaces";
import { hexToRGB } from "../color-picker/utils";

/**
 * Convert a string to a valid hex by hashing its contents
 * and using the hash as a seed for three distinct color values
 *
 * @param string
 */
export function stringToHex(string: string): string {
  // improve random color generation for similar strings.
  string = mixStringDeterministically(string);

  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let hex = "#";
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 0xff;
    hex += ("00" + value.toString(16)).substr(-2);
  }
  return hex;
}

/**
 * The function splits the string into two halves, reverses each half, and then concatenates them.
 *
 * @param {string} string - The input string to be mixed.
 * @returns {string} - The mixed string.
 */
function mixStringDeterministically(string: string): string {
  const midPoint = Math.floor(string.length / 2);
  const reversed = string.split("").reverse().join("");
  return reversed.substring(midPoint) + reversed.slice(0, midPoint);
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
