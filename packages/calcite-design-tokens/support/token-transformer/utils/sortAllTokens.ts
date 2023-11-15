import { Dictionary } from "style-dictionary/types/Dictionary";
import { default as StyleDictionary } from "style-dictionary";
import { TransformedToken } from "style-dictionary/types/TransformedToken";

export function sortAllTokens(dictionary: Dictionary, outputReferences: boolean): TransformedToken[] {
  let tokens = dictionary.allTokens;
  if (outputReferences) {
    tokens = [...dictionary.allTokens].sort(StyleDictionary.formatHelpers["sortByReference"](dictionary));
  }

  return tokens;
}
