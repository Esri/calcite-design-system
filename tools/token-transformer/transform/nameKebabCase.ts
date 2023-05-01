import { paramCase } from "change-case";
import { parseTokenPath } from "../utils/parseTokenPath.js";

/**
 *
 * @param token Style Dictionary token object
 * @param options Style Dictionary format options
 * @returns an updated name for the token which will be used for the final output
 */
export function nameKebabCase(token, options) {
  return paramCase([options.prefix].concat(parseTokenPath(token.path)).join(" "));
}
