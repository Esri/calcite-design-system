import { TransformedToken as SdTransformedTokens } from "style-dictionary/types/TransformedToken";
import { PlatformObject } from "../platform";

export type TransformedToken = SdTransformedTokens & {
  attributes: SdTransformedTokens["attributes"] & { platformReference?: PlatformObject<string> };
};
