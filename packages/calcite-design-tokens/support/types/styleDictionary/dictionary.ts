import { Dictionary as SdDictionary } from "style-dictionary/types/Dictionary.js";
import { TransformedToken } from "./transformedToken";
import { TransformedTokens } from "./transformedTokens";

export type Dictionary = SdDictionary & {
  allTokens: TransformedToken[];
  tokens: TransformedTokens;
  allProperties: TransformedToken[];
  properties: TransformedTokens;
  usesReference: SdDictionary["usesReference"];
  getReferences: (value: any) => TransformedToken[];
};
