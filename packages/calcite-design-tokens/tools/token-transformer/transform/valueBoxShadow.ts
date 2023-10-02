import { TransformedToken } from "style-dictionary/types/TransformedToken";

/**
 *
 * @param {TransformedToken} token  - the SD token object
 * @returns {boolean} This transformer should only be applied to boxShadow tokens
 */
export function matchBoxShadow(token: TransformedToken): boolean {
  return token.attribute.type === "boxShadow" && Array.isArray(token.value);
}

/**
 * @description Transform Style Dictionary token into a CSS box-shadow
 * @param {TransformedToken} token  - the SD token object
 * @returns {string} the token value as a CSS box-shadow prop value string
 */
export function valueBoxShadow(token: TransformedToken): string {
  return token.original.value
    .map((shadow) => {
      return `${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.spread} ${shadow.color}`;
    })
    .join(", ");
}
