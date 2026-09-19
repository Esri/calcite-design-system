import type { Dictionary, FormatFn } from "style-dictionary/types";
import { formats } from "style-dictionary/enums";
import StyleDictionary from "style-dictionary";
import type { PlatformConfig, RegisterFn } from "../../types.ts";
import { getStylesheetFormat } from "./utils/index.ts";

function normalizeRelativeSizes(declarations: string, dictionary: Dictionary, format: "css" | "scss"): string {
  const prefix = format === "css" ? "--" : "$";

  dictionary.allTokens.forEach((token) => {
    const isRelativeSize = token.path[0] === "core" && token.path[1] === "size" && token.path[2] === "relative";
    const value = token.$value;

    if (isRelativeSize && typeof value === "string" && value.endsWith("%")) {
      declarations = declarations.replace(
        `${prefix}${token.name}: ${value}`,
        `${prefix}${token.name}: ${Number.parseFloat(value) / 100}`,
      );
    }
  });

  return declarations;
}

export const formatCore: FormatFn = async (args) => {
  const { dictionary } = args;
  const format = getStylesheetFormat(args.platform as PlatformConfig);
  const formatter = StyleDictionary.hooks.formats[format === "css" ? formats.cssVariables : formats.scssVariables];
  const content = await formatter(args);

  return normalizeRelativeSizes(content, dictionary, format);
};

export const registerFormatCore: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatCore,
    format: formatCore,
  });
};

export const FormatCore = "calcite/format/core";
