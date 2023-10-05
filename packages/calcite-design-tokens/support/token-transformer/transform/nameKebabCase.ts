import { paramCase } from "change-case";
import { TransformedToken } from "style-dictionary/types/TransformedToken.js";
import { Options } from "style-dictionary/types/Options.js";
import { parseTokenPath } from "../utils/parseTokenPath.js";

/**
 * convert token name to kebab case
 * @param {TransformedToken} token Style Dictionary token object
 * @param {Options} options Style Dictionary format options
 * @returns {string} an updated name for the token which will be used for the final output
 */
export function nameKebabCase(token: TransformedToken, options: Options): string {
  const paths = token.path.reduce((acc, p, idx) => {
    if (p === "core") {
      acc.push("app");
    } else if (typeof token.path[idx + 1] === "string" && !new RegExp(`${p}`).test(token.path[idx + 1])) {
      acc.push(p);
    } else if (idx === token.path.length - 1) {
      acc.push(p);
    }
    return acc;
  }, []);

  return paramCase([options.prefix].concat(parseTokenPath(paths)).join(" "));
}
