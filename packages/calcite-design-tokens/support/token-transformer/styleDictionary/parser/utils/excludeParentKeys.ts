import { DeepKeyTokenMap } from "../../../../types/tokenTypes/designTokenTypes";
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
