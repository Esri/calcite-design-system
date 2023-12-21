import { checkAndEvaluateMath } from "@tokens-studio/sd-transforms";

import { Dictionary } from "../../../../types/styleDictionary/dictionary.js";
import { TransformedToken } from "../../../../types/styleDictionary/transformedToken.js";
import { TokenBreakpointContextUnion } from "../../../../types/tokenTypes/breakpointContext.js";
import { handleStringValueTokens } from "./handleStringValue.js";
import { Platform } from "../../../../types/platform.js";
import { transformNamesKebabCase } from "../../transformer/name/nameKebabCase.js";
import { MappedFormatterArguments } from "../../../../types/styleDictionary/formatterArguments.js";

export function handleBreakpoint(
  token: TransformedToken,
  dictionary: Dictionary,
  args: MappedFormatterArguments,
): string | { [key in TokenBreakpointContextUnion]: string } {
  if (typeof token.value === "string") {
    return handleStringValueTokens(token, dictionary, args);
  }

  const returnObject = Object.entries(token.value).reduce(
    (acc, [minMaxKey, breakpointValue]) => {
      let alteredToken = {
        ...token,
        value: checkAndEvaluateMath(`${breakpointValue}`),
        original: {
          ...token.original,
          value: token.original.value[minMaxKey],
        },
      };
      switch (args.options.platform) {
        case "css":
        case "scss":
        case "sass":
          alteredToken = {
            ...alteredToken,
            path: [...alteredToken.path, minMaxKey],
          };
          acc[minMaxKey] = handleStringValueTokens(
            { ...alteredToken, name: transformNamesKebabCase(alteredToken, args) },
            dictionary,
            args,
          );
          break;
        case "es6":
          acc[minMaxKey] = handleStringValueTokens(alteredToken, dictionary, args);
          break;
        default:
          break;
      }

      return acc;
    },
    {} as { [key in TokenBreakpointContextUnion]: string },
  );

  return args.options.platform === Platform.SCSS || args.options.platform === Platform.SASS
    ? Object.values(returnObject).join("\n\n")
    : args.options.platform === Platform.CSS
      ? Object.values(returnObject).join("\n\t")
      : returnObject;
}
