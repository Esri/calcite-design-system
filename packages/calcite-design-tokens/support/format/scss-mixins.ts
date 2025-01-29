import StyleDictionary from "style-dictionary";
import { Dictionary, FormatFnArguments } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";

function formatRules(value) {
  return Object.keys(value).reduce((acc, key) => {
    return `${acc}\n  ${key}: ${value[key]};`;
  }, "");
}

function formatMixins(dictionary: Dictionary) {
  return Object.keys(dictionary).reduce((acc, key) => {
    const { value } = dictionary[key];
    return `${acc}\n@mixin ${key}() {\n  ${formatRules(value)}\n}`;
  }, "");
}

export async function formatSCSSMixins(args: FormatFnArguments): Promise<string> {
  const header = await fileHeader({
    file: args.file,
    formatting: args.options.formatting,
    options: args.options,
  });
  return header + formatMixins(args.dictionary) + `\n`;
}

export async function registerFormatSCSSMixins(sd: typeof StyleDictionary): Promise<void> {
  sd.registerFormat({
    name: FormatCalciteSCSSMixins,
    format: formatSCSSMixins,
  });
}

export const FormatCalciteSCSSMixins = "calcite/format/scss-mixins";
