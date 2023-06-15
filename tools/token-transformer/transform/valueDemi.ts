import { TransformedToken } from "style-dictionary/types/TransformedToken";

/**
 *
 * @param {TransformedToken} token  - the SD token object
 * @returns {boolean} This transformer should only be applied to "Demi" font weights
 */
export function matcher(token: TransformedToken): boolean {
  return token.type === "fontWeights" && token.original.value === "Demi";
}

/**
 * @description Transform Style Dictionary token into a numerical font-weight
 * @param {TransformedToken} token  - the SD token object
 * @returns {string} the token value as a numeric font-weight
 */
export function transformer(token: TransformedToken): string {
  return token.value === "Demi" ? "600" : token.value;
}
