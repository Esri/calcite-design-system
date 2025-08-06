import type { Dictionary } from "style-dictionary/types";
import { convertTokenData } from "style-dictionary/utils";

export function fromTokens(
  tokens: Parameters<typeof convertTokenData>[0],
  unfilteredTokens?: Parameters<typeof convertTokenData>[0],
): Dictionary {
  const dictionary: Dictionary = {
    tokens: convertTokenData(tokens, { output: "object" }),
    allTokens: convertTokenData(tokens, { output: "array" }),
    tokenMap: convertTokenData(tokens, { output: "map" }),
  };

  if (unfilteredTokens) {
    dictionary.unfilteredTokens = convertTokenData(unfilteredTokens, { output: "object" });
    dictionary.unfilteredAllTokens = convertTokenData(tokens, { output: "array" });
    dictionary.unfilteredTokenMap = convertTokenData(tokens, { output: "map" });
  }

  return dictionary;
}
