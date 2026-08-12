import type { FormatFnArguments, Dictionary, OutputReferences, TransformedToken } from "style-dictionary/types";
import { formattedVariables, getReferences } from "style-dictionary/utils";
import type { Stylesheet } from "../../../types/interfaces.d.ts";
import { hasOutputReferenceExtension } from "../../utils/output-references.ts";

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

export function dedupeTokensByName<T extends { name: string }>(tokens: T[]): T[] {
  return [...new Map(tokens.map((token) => [token.name, token])).values()];
}

export function isReplacementToken(token: Parameters<Exclude<OutputReferences, boolean>>[0]): boolean {
  return hasOutputReferenceExtension(token) || token.comment?.startsWith("Replaces `--calcite-");
}

export function createScopedReferenceDeclarations(
  tokens: TransformedToken[],
  dictionary: Pick<Dictionary, "tokens">,
): string[] {
  return dedupeTokensByName(tokens).map((token) => {
    const originalValue = token.original?.$value;

    if (typeof originalValue !== "string") {
      throw new Error(`Token ${token.name} does not have a string reference value.`);
    }

    const [referenceToken] = getReferences(originalValue, dictionary.tokens);

    if (!referenceToken) {
      throw new Error(`Reference token for ${token.name} was not found.`);
    }

    return `--${token.name}: var(--${referenceToken.name}, inherit);${token.comment ? ` /** ${token.comment} */` : ""}`;
  });
}
