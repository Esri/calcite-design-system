// This is a copy/extension of sd-transforms/src/parsers/add-font-styles.ts with better types

import { TransformOptions } from "../../../../types/styleDictionary/transformOptions.js";
import { DeepKeyTokenMap, SingleToken } from "../../../../types/tokenStudio/designTokenTypes.js";

function recurse(
  slice: SingleToken<false> | DeepKeyTokenMap<false>,
  copy: DeepKeyTokenMap<false>,
  alwaysAddFontStyle = false
): void {
  for (const key in slice) {
    const token = slice[key];
    if (typeof token !== "object" || token === null) {
      continue;
    }
    const { type, value } = token;
    if (type === "typography") {
      if (typeof value !== "object" || value.fontWeight === undefined) {
        continue;
      }
    } else if (typeof token === "object") {
      recurse(token, copy, alwaysAddFontStyle);
    }
  }
}

export function addFontStyles(
  dictionary: DeepKeyTokenMap<false>,
  transformOpts?: TransformOptions
): DeepKeyTokenMap<false> {
  const copy = { ...dictionary };
  recurse(copy, copy, transformOpts?.alwaysAddFontStyle);
  return copy;
}
