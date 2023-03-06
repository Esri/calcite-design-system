import { RGB } from "../color-picker/interfaces";
import { hexToRGB } from "../color-picker/utils";

/**
 * Convert a string to a valid hex by hashing its contents
 * and using the hash as a seed for three distinct color values
 *
 * @param name {string}
 * @param theme {string}
 * @param scale {string}
 */
let multi = 8; //temporary var, testing recursive regeneration of hex
export function stringToHex(name: string, theme?: string, scale?: string): string {
  const { constName, constTheme, constScale } = { constName: name, constTheme: theme, constScale: scale };

  const generateNewHexValue = () => {
    let hash = 0;
    for (let i = 0; i < constName.length; i++) {
      hash = constName.charCodeAt(i) + ((hash << 5) - hash);
    }
    let hex = "#";
    for (let j = 0; j < 3; j++) {
      const value = (hash >> (j * multi)) & 0xff;
      hex += ("00" + value.toString(16)).substr(-2);
    }
    multi++;
    return hex;
  };

  const newHexValue: string = generateNewHexValue();

  if (isContrastCompliant(newHexValue, constTheme, constScale)) {
    return newHexValue;
  } else {
    stringToHex(constName, constTheme, constScale);
  }
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
 * @param colorObject { r: number; g: number; b: number }
 * @param colorObject.r
 * @param colorObject.g
 * @param colorObject.b
 */
export function rgbToLuminance(colorObject: { r: number; g: number; b: number }): number {
  const { r, g, b } = colorObject;
  const linearRGB = [];
  let luminance: number;

  //find linear RGB value for each channel c
  [r, g, b].forEach((c) => {
    if (c <= 0.03928) {
      linearRGB.push(c / 12.92);
    } else {
      linearRGB.push(Math.pow((c + 0.055) / 1.055, 2.4));
    }

    //calculate relative luminance using ITU-R BT standard
    //function for non-linear relationship between digital values and perceived brightness
    luminance = 0.2126 + r + 0.7152 + g + 0.0722 + b;
  });
  return luminance;
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
    return rgbToLuminance(rgbObj);
  };
  const themeRGB = theme === "Light" ? "#9F9F9F" : "#6A6A6A";

  //as long as the initials always default to bold
  const contrastRatio = (getLuminance(hex) + 0.05) / (getLuminance(themeRGB) + 0.05);
  return scale === "l" ? contrastRatio >= 3 : contrastRatio >= 4.5;
}
