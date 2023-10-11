import { camelCase } from "change-case";
import { TransformedToken } from "style-dictionary/types/TransformedToken.js";
import { Options } from "style-dictionary/types/Options.js";
import { parseTokenPath } from "../utils/parseTokenPath.js";

/**
 * Convert token name to camel case
 *
 * @param {TransformedToken} token Style Dictionary token object
 * @param {Options} options Style Dictionary format options
 * @returns {string} an updated name for the token which will be used for the final output
 */
export function nameCamelCase(token: TransformedToken, options: Options): string {
  return camelCase([options.prefix].concat(parseTokenPath(token.path)).join(" "));
}
