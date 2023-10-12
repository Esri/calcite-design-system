import { Core as StyleDictionary, TransformedToken, Options } from "style-dictionary";
import { paramCase } from "change-case";
import { parseTokenPath } from "../utils/parseTokenPath.js";

/**
 * convert token name to kebab case
 *
 * @param {TransformedToken} token Style Dictionary token object
 * @param {Options} options Style Dictionary format options
 * @returns {string} an updated name for the token which will be used for the final output
 */
export function nameKebabCaseFunction(token: TransformedToken, options: Options): string {
  return paramCase([options.prefix].concat(parseTokenPath(token.path)).join(" "));
}

export const registerNameKebabCase = (sd: StyleDictionary): void => {
  sd.registerTransform({
    name: nameKebabCase,
    type: "name",
    transformer: nameKebabCaseFunction,
  });
};

export const nameKebabCase = "name/calcite/kebab-case";
