import { Dictionary } from "../../../../types/styleDictionary/dictionary";
import { TransformedToken } from "../../../../types/styleDictionary/transformedToken";
import { TokenColorSchemeUnion } from "../../../../types/tokenTypes/colorScheme";
import { MappedFormatterArguments } from "../utils.js";
import { handleStringValueTokens } from "./handleStringValue.js";

export function handleColor(
  token: TransformedToken,
  dictionary: Dictionary,
  args: MappedFormatterArguments
): string | { [key in TokenColorSchemeUnion]: string } {
  return typeof token.value === "string"
    ? handleStringValueTokens(token, dictionary, args)
    : Object.entries(token.value).reduce((acc, [contextKey, colorValue]) => {
        const alteredToken = {
          ...token,
          value: colorValue,
          original: {
            ...token.original,
            value: token.original.value[contextKey],
          },
        };
        switch (args.options.platform) {
          case "css":
          case "scss":
          case "sass":
          case "es6":
            acc[contextKey] = handleStringValueTokens(alteredToken, dictionary, args);
          default:
            break;
        }

        return acc;
      }, {} as { [key in TokenColorSchemeUnion]: string });
}
