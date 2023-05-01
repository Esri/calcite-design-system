import { camelCase } from "change-case";
import { parseTokenPath } from "../utils/parseTokenPath";

/**
 *
 * @param token Style Dictionary token object
 * @param options Style Dictionary format options
 * @returns an updated name for the token which will be used for the final output
 */
export function nameCamelCase(token, options) {
  return camelCase([options.prefix].concat(parseTokenPath(token.path)).join(" "));
}
