import { camelCase } from "change-case";
import { Core as StyleDictionary, Options, TransformedToken } from "style-dictionary";
import { parseTokenPath } from "../utils/parseTokenPath.js";

/**
 * Convert token name to camel case
 *
 * @param {TransformedToken} token Style Dictionary token object
 * @param {Options} options Style Dictionary format options
 * @returns {string} an updated name for the token which will be used for the final output
 */
export function nameCamelCaseFunction(token: TransformedToken, options: Options): string {
  return camelCase([options.prefix].concat(parseTokenPath(token.path)).join(" "));
}

export const registerNameCamelCase = (sd: StyleDictionary): void => {
  sd.registerTransform({
    name: nameCamelCase,
    type: "name",
    transformer: nameCamelCaseFunction,
  });
};

export const nameCamelCase = "name/calcite/camel-case";
