import { TransformedToken } from "style-dictionary/types";

/**
 * Helper function to remove extraneous token attributes
 *
 * Removal of these fields are to get output as similar as possible to production
 * it can be removed afterward
 *
 * @param token
 */
export function cleanAttributes(token: TransformedToken): void {
  if (token.attributes) {
    if (token.attributes.original) {
      delete token.attributes.original;
    }

    if (token.attributes.attributes) {
      delete token.attributes.attributes;
    }

    if (token.attributes.$extensions) {
      delete token.attributes.$extensions;
    }
  }

  if (token.original?.$extensions) {
    delete token.original.$extensions;
  }

  if (token.$extensions) {
    delete token.$extensions;
  }
}
