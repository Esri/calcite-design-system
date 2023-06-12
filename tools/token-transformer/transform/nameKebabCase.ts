import { paramCase } from "change-case";
import { TransformedToken } from "style-dictionary/types/TransformedToken.js";
import { Options } from "style-dictionary/types/Options.js";
import { dedupeStringsInArray } from "../utils/dedupeStringsInArray.js";

/**
 * convert token name to kebab case
 * @param {TransformedToken} token Style Dictionary token object
 * @param {Options} options Style Dictionary format options
 * @returns {string} an updated name for the token which will be used for the final output
 */
export function nameKebabCase(token: TransformedToken, options: Options): string {
  const nameArray = dedupeStringsInArray(
    [options.prefix].concat(token.path.filter((p) => p !== "default")).filter((p) => p)
  );
  return paramCase(nameArray.join(" "));
}
