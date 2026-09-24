import type { FormatFnArguments, Dictionary, TransformedToken } from "style-dictionary/types";
import { formattedVariables } from "style-dictionary/utils";
import type { PlatformConfig, Stylesheet } from "../../../types.ts";

export function createBlock(selector: string, declarations: string[]): string {
  const content = declarations
    .join("\n")
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");

  return `${selector} {\n${content}\n}`;
}

export function getStylesheetFormat(platform: PlatformConfig): Stylesheet {
  if (platform.options.platform !== "css" && platform.options.platform !== "scss") {
    throw new Error("Only css and scss platforms are supported.");
  }

  return platform.options.platform;
}

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
