import { TransformedToken } from "style-dictionary/types/TransformedToken";
import { PlatformOptions } from "../../types/styleDictionary/platform.js";
import { FormattingRules } from "../styleDictionary/formatter/utils.js";

export function createTokenReference(token: TransformedToken, args: PlatformOptions): string {
  const format = args.options.platform || args.file?.format || args.files[0].format;
  const formatting = FormattingRules[format] || FormattingRules.default;

  switch (format) {
    case "css":
      return args.options.outputReferenceFallbacks
        ? `var(${formatting.prefix}${token.name}, ${token.value})`
        : `var(${formatting.prefix}${token.name})`;
    case "sass":
    case "scss":
      return `${formatting.prefix}${token.name}`;
    default:
      return `${token.name}`;
  }
}
