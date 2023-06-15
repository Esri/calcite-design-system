import { TransformedToken } from "style-dictionary/types/TransformedToken.js";

/**
 * convert token name to kebab case
 * @param {TransformedToken} token Style Dictionary token object
 * @returns {string} an updated name for the token which will be used for the final output
 */
export function nameKebabCase(token: TransformedToken): string {
  const name = token.path.reduce((acc, n, idx) => {
    const nextVal = token.path[idx + 1];

    if (n !== "default") {
      if (idx === token.path.length - 1 || (typeof nextVal === "string" && !new RegExp(`${n}`).test(nextVal))) {
        acc.push(n);
      }
    }
    return acc;
  }, []);

  return name.join("-");
}
