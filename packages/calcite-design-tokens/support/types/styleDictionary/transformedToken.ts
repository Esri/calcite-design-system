import { TransformedToken as SdTransformedTokens } from "style-dictionary/types/TransformedToken";

export type TransformedToken = SdTransformedTokens & {
  attributes: SdTransformedTokens["attributes"];
};
