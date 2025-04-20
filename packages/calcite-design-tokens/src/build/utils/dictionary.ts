import type { Dictionary } from "style-dictionary/types";
import { convertTokenData } from "style-dictionary/utils";

export function fromTokens(tokens: Parameters<typeof convertTokenData>[0]): Dictionary {
  return {
    tokens: convertTokenData(tokens, { output: "object" }),
    allTokens: convertTokenData(tokens, { output: "array" }),
    tokenMap: convertTokenData(tokens, { output: "map" }),
  };
}
