import type { Dictionary, FormatFnArguments, TransformedToken } from "style-dictionary/types";
import { formattedVariables } from "style-dictionary/utils";
import type { Stylesheet } from "../../../types.ts";
import { hasReplacementReferenceExtension } from "../../utils/output-references.ts";

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

/**
 * Util to create a replacement-token alias var list
 *
 * @param dictionary
 */
export function createReplacementVarList(
  dictionaryOrFormat: Dictionary | Stylesheet,
  dictionaryOrUndefined?: Dictionary,
): string {
  // Support both signatures for backward compatibility
  const dictionary = (dictionaryOrUndefined ?? dictionaryOrFormat) as Dictionary;
  const replacementTokens = dictionary.allTokens.filter(hasReplacementReferenceExtension);

  if (!replacementTokens.length) {
    return "";
  }

  return replacementTokens
    .map((token) => {
      const deprecatedTokenReference = String(token.original?.$value ?? token.$value ?? "");
      const deprecatedToken = dictionary.tokenMap.get(deprecatedTokenReference);

      if (!deprecatedToken) {
        throw new Error(`Could not resolve replacement token: ${token.name} references ${deprecatedTokenReference}`);
      }

      return `--${token.name}: var(--${deprecatedToken.name});`;
    })
    .filter(Boolean)
    .join("\n");
}
