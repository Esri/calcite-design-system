import { paramCase } from "change-case";
import { TransformedToken } from "style-dictionary/types/TransformedToken.js";
import { Platform } from "style-dictionary/types/Platform.js";
import { parseTokenPath } from "../utils/parseTokenPath.js";

/**
 * convert token name to kebab case
 *
 * @param {TransformedToken} token Style Dictionary token object
 * @param {Platform} options Style Dictionary format options
 * @returns {string} an updated name for the token which will be used for the final output
 */
export function nameKebabCase(token: TransformedToken, options?: Platform): string {
  return paramCase([options?.prefix].concat(parseTokenPath(token.path)).join(" "));
}