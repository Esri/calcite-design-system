import { camelCase } from "change-case";
import { TransformedToken } from "style-dictionary/types/TransformedToken.js";
import { parseTokenPath } from "../utils/parseTokenPath.js";
import { Platform } from "style-dictionary/types/Platform.js";

/**
 * Convert token name to camel case
 *
 * @param {TransformedToken} token Style Dictionary token object
 * @param {Platform} options Style Dictionary format options
 * @returns {string} an updated name for the token which will be used for the final output
 */
export function nameCamelCase(token: TransformedToken, options?: Platform): string {
  return camelCase([options?.prefix].concat(parseTokenPath(token.path)).join(" "));
}
