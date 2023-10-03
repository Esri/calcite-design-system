import { paramCase } from "change-case";
import { TransformedToken } from "style-dictionary/types/TransformedToken.js";
import { parseTokenPath } from "../utils/parseTokenPath.js";

/**
 * convert token name to kebab case
 * @param {TransformedToken} token Style Dictionary token object
 * @param {Options} options Style Dictionary format options
 * @returns {string} an updated name for the token which will be used for the final output
 */
export function nameCalciteSCSS(token: TransformedToken): string {
  return paramCase([].concat(parseTokenPath(token.path)).join(" "));
}
