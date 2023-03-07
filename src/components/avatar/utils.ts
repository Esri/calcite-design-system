import { RGB } from "../color-picker/interfaces";
import { hexToRGB } from "../color-picker/utils";
import Color from "color";

/**
 * Convert a string to a valid hex by hashing its contents
 * and using the hash as a seed for three distinct color values
 *
 * @param name {string}
 * @param nameOrId
 * @param theme {string}
 * @param scale {string}
 */
export function stringToHex(nameOrId: string, theme: string, scale: string): string {
  let hex = nameOrId.startsWith("#") ? nameOrId : "#";
  if (!nameOrId.startsWith("#")) {
    let hash = 0;
    for (let i = 0; i < nameOrId.length; i++) {
      hash = nameOrId.charCodeAt(i) + ((hash << 5) - hash);
    }
    for (let j = 0; j < 3; j++) {
      const value = (hash >> (j * 8)) & 0xff;
      hex += ("00" + value.toString(16)).substr(-2);
    }
  }
  let color;
  while (!isContrastCompliant(hex, theme, scale)) {
    color = theme === "light" ? Color(hex).darken(0.5).rgb().string() : Color(hex).lighten(0.5).rgb().string();
  }
  return color;
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
 * For RGB color, find luminance
 *
 * @param colorObject {RGB}
 */
export function rgbToLuminosity(colorObject: RGB): number {
  const color = Color(colorObject);
  const luminosity = color.luminosity();
  return luminosity;
}

/**
 * Verify the generated color is WCAG contrast compliant
 *
 * @param hex {string} - form of "#------"
 * @param theme {string}
 * @param scale {string}
 */
export function isContrastCompliant(hex: string, theme: string, scale: string): boolean {
  const getLuminance = (hex) => {
    const rgbObj = hexToRGB(hex);
    return rgbToLuminosity(rgbObj);
  };
  const themeInitials = theme === "Light" ? "#9F9F9F" : "#6A6A6A";

  //as long as the initials always default to bold
  const contrastRatio = (getLuminance(hex) + 0.05) / (getLuminance(themeInitials) + 0.05);
  return scale === "l" ? contrastRatio >= 3 : contrastRatio >= 4.5;
}
