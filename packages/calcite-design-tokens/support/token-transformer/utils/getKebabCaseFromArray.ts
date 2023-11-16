import { paramCase } from "change-case";
import { parseTokenPath } from "./parseTokenPath.js";

/**
 * Convert token name to camel case
 *
 * @param {string[]} path the path to the token through the JSON object as an array
 * @param {string} prefix a string to prefix to the return value
 * @returns {string} an updated name for the token which will be used for the final output
 */
export function getKebabCaseFromArray(path: string[], prefix?: string): string {
  const [tokenPath, hasNegativeKey] = parseTokenPath(path);
  let tokenNameInParamCase = paramCase([prefix].concat(tokenPath).join(" "));

  if (hasNegativeKey.length > 0) {
    hasNegativeKey.forEach((originalKey) => {
      const paramCasedKey = originalKey.replace("-", "");
      const updatedToken = tokenNameInParamCase.replace(paramCasedKey, originalKey);
      tokenNameInParamCase = updatedToken;
    });
  }

  return tokenNameInParamCase;
}
