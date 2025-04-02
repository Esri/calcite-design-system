import { Dictionary, TransformedTokens } from "style-dictionary/types";
import { convertTokenData } from "style-dictionary/utils";

export function fromTokens(tokens: TransformedTokens): Dictionary {
  return {
    tokens: tokens,
    allTokens: convertTokenData(tokens, { output: "array" }),
    tokenMap: convertTokenData(tokens, { output: "map" }),
  };
}
