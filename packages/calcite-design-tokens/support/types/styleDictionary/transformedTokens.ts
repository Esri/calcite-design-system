import { TransformedToken } from "./transformedToken";

export interface TransformedTokens {
  [key: string]: TransformedTokens | TransformedToken;
}
