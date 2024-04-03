// This is a copy/extension of sd-transforms/src/transformFontWeights.ts
// eslint-disable-next-line @cspell/spellchecker
// "demi" was added to align with our design terminology. This was added to utils because these named exports are not available from the node module dependency.

import { FontWeight } from "../../../../types/tokenStudio/fontWeight.js";

export const fontStyles = ["italic", "oblique", "normal"];
export const fontWeightReg = new RegExp(`(?<weight>.+?)\\s?(?<style>${fontStyles.join("|")})?$`, "i");

/**
 * Helper: Transforms fontweight key names to fontweight numbers (100, 200, 300 ... 900)
 *
 * @param {string | undefined | number} value the value passed from the StyleDictionary runner. In the case that this is a composite typography token this will automatically update the fontWeight
 * @returns {number | string | undefined} if the font weight name was found in FontWeights it will return its numeric value, otherwise it will just return the token value
 */
export function transformFontWeights(value: string | undefined | number): number | string | undefined {
  if (value === undefined) {
    return value;
  }
  const match = `${value}`.match(fontWeightReg);

  let mapped: string;
  if (match?.groups?.weight) {
    mapped = FontWeight[match?.groups?.weight.toLowerCase()];
    if (match.groups.style) {
      mapped = `${mapped} ${match.groups.style.toLowerCase()}`;
    }
  }

  return mapped ?? value;
}
