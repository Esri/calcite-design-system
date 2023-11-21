import { TransformedToken } from "style-dictionary/types/TransformedToken.js";
import { PlatformOptions } from "../../../../types/styleDictionary/platform.js";
import { FormattingRules } from "../utils.js";

export function createTokenReference(token: TransformedToken, args: PlatformOptions): string {
  const formatting = FormattingRules[args.options.platform] || FormattingRules.default;

  switch (args.options.platform) {
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
