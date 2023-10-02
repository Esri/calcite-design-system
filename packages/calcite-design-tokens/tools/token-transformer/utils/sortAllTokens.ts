import { Dictionary } from "style-dictionary/types/Dictionary";
import { TransformedToken } from "style-dictionary/types/TransformedToken";
import { sortByReference } from "./sortByReferences.js";

export function sortAllTokens(dictionary: Dictionary, outputReferences: boolean): TransformedToken[] {
  let tokens = dictionary.allTokens;
  if (outputReferences) {
    tokens = [...dictionary.allTokens].sort(sortByReference(dictionary));
  }

  return tokens;
}
