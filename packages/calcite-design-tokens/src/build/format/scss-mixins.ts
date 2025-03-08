import { Dictionary, FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import { RegisterFn } from "../types/interfaces.js";

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

export const formatSCSSMixins: FormatFn = async (args) => {
  const header = await fileHeader({
    file: args.file,
    formatting: args.options.formatting,
    options: args.options,
  });
  return header + formatMixins(args.dictionary) + `\n`;
};

export const registerFormatSCSSMixins: RegisterFn = async (sd) => {
  sd.registerFormat({
    name: FormatCalciteSCSSMixins,
    format: formatSCSSMixins,
  });
};

export const FormatCalciteSCSSMixins = "calcite/format/scss-mixins";
