import type { FormatFnArguments, Dictionary, TransformedToken } from "style-dictionary/types";
import { formattedVariables } from "style-dictionary/utils";
import { Stylesheet } from "../../../types/interfaces.js";

/**
 * Helper function to remove extraneous token attributes
 *
 * Removal of these fields is to get output as similar as possible to production
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

/**
 * Util to create a var list from a format's arguments
 *
 * @param format
 * @param dictionary
 * @param args
 */
export function createVarList(
  format: Stylesheet,
  dictionary: Dictionary,
  args: FormatFnArguments,
): ReturnType<typeof formattedVariables> {
  return formattedVariables({
    format,
    dictionary,
    ...args.options,
  });
}
