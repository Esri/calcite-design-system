import { TransformedToken } from "style-dictionary/types/TransformedToken";
import { Dictionary } from "style-dictionary/types/Dictionary.js";
import { appendFileSync } from "fs";

import { handleStringValueTokens } from "../utils/handleStringValue.js";
import { MappedFormatterArguments } from "../utils.js";

export function handleColorToken(
  token: TransformedToken,
  dictionary: Dictionary,
  args: MappedFormatterArguments
): string | void {
  const colorContextFileMap = args.options.expandFiles[args.options.platform].colorScheme;

  return typeof token.value === "string"
    ? handleStringValueTokens(token, dictionary, args)
    : Object.entries(token.value).forEach(([contextKey, colorValue]) => {
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
            appendFileSync(
              colorContextFileMap[contextKey],
              handleStringValueTokens(alteredToken, dictionary, args) + "\n",
              {
                flag: "a",
              }
            );
            break;
          default:
            break;
        }
      });
}
