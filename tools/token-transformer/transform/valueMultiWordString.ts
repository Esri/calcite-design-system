import { TransformedToken } from "style-dictionary/types/TransformedToken";

/**
 *
 * @param {TransformedToken} token  - the SD token object
 * @returns {boolean} This transformer should only be applied to multi-word tokens
 */
export function matchMultiWord(token: TransformedToken): boolean {
  return token.original.value.includes(" ");
}

/**
 * @description Forces multi-word strings to be wrapped in quotes
 * @param {TransformedToken} token  - the SD token object
 * @returns {string} a string wrapped in '"'
 */
export function valueMultiWord(token: TransformedToken): string {
  return `"${token.value}"`;
}
