/**
 * This is a copy of @tokens-studio/sd-transforms/dist/parsers/exclude-parent-key.js because it is not provided in the exports and we need to update the types.
 */
import { DeepKeyTokenMap } from "../../../../types/tokenStudio/designTokenTypes";
import { TransformOptions } from "../../../../types/styleDictionary/transformOptions";

export function excludeParentKeys(
  dictionary: DeepKeyTokenMap<false>,
  transformOpts?: TransformOptions
): DeepKeyTokenMap<false> {
  if (!transformOpts?.excludeParentKeys) {
    return dictionary;
  }
  const copy = {};
  Object.values(dictionary).forEach((set) => {
    Object.entries(set).forEach(([key, tokenGroup]) => {
      copy[key] = tokenGroup;
    });
  });
  return copy;
}
