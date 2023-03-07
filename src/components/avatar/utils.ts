import { RGB } from "../color-picker/interfaces";
import { hexToRGB } from "../color-picker/utils";
import Color from "color";

/**
 * Convert a string to a valid hex by hashing its contents
 * and using the hash as a seed for three distinct color values
 *
 * @param nameOrId {string}
 * @param theme {string}
 */
export function stringToHexCompliant(nameOrId: string, theme: string): string {
  let hex;

  if (nameOrId.startsWith("#")) {
    hex = nameOrId;
  } else {
    let hash = 0;
    for (let i = 0; i < nameOrId.length; i++) {
      hash = nameOrId.charCodeAt(i) + ((hash << 5) - hash);
    }
    hex = "#";
    for (let j = 0; j < 3; j++) {
      const value = (hash >> (j * 8)) & 0xff;
      hex += ("00" + value.toString(16)).substr(-2);
    }
  }
  const compliant = isContrastCompliant(hex, theme);
  if (compliant) {
    return compliant;
  } else {
    const darkenAvatarBackground = Color(hex).darken(0.5).rgb().string(); //returns "rgb(127, 0, 0)" format
    const lightenAvatarBackground = Color(hex).lighten(0.5).rgb().string();

    hex = theme === "light" ? Color(lightenAvatarBackground).hex() : Color(darkenAvatarBackground).hex();

    return stringToHexCompliant(hex, theme);
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
 */
export function isContrastCompliant(hex: string, theme: string): string | null {
  const getLuminance = (hex) => {
    const rgbObj = hexToRGB(hex);
    return rgbToLuminosity(rgbObj);
  };
  const themeInitials = theme === "light" ? "#6A6A6A" : "#9f9f9f";

  //dark mode uses ui-text-3-dark #9f9f9f (lighter grey initials, darker background)  luminosity 0.35
  //light mode uses ui-text-3 #6a6a6a (darker grey initials, lighter background) luminosity 0.144
  const contrastRatio =
    theme === "light"
      ? (getLuminance(hex) + 0.05) / (getLuminance(themeInitials) + 0.05)
      : (getLuminance(themeInitials) + 0.05) / (getLuminance(hex) + 0.05); //divide by darker value (lower lum value)

  return contrastRatio >= 4.5 ? hex : null; //our largest initials are 16px bold (requirement is for <18.5 px (14pt) if bold)
}
