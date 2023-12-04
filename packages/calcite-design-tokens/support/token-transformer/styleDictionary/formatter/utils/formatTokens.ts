import { Dictionary } from "../../../../types/styleDictionary/dictionary.js";
import { handleColor } from "./handleColor.js";
import { handleStringValueTokens } from "./handleStringValue.js";
import { handleTypography } from "./handleTypography.js";
import { sortByReference } from "./sortByReference.js";
import { ExpandableTokenTypes } from "../../../../types/tokenStudio/designTokenTypes.js";
import { handleBreakpoint } from "./handleBreakpoint.js";
import { MappedFormatterArguments } from "../../../../types/styleDictionary/formatterArguments.js";

export type FormattedTokens = Record<string, (string | Record<string, string>)[]>;

export function formatTokens(dictionary: Dictionary, args: MappedFormatterArguments): FormattedTokens {
  const allTokens = [...dictionary.allTokens].sort(sortByReference(dictionary));
  const returnFiles: FormattedTokens = {};
  return allTokens.reduce((acc, token) => {
    let group = "default";
    let formattedToken;

    switch (token.type) {
      case ExpandableTokenTypes.BREAKPOINT:
        formattedToken = handleBreakpoint(token, dictionary, args);

        break;
      case ExpandableTokenTypes.TYPOGRAPHY:
        formattedToken = handleTypography(token, args);
        break;
      case ExpandableTokenTypes.COLORSCHEME:
      case "color":
        formattedToken = handleColor(token, dictionary, args);
        token.type = typeof formattedToken === "string" ? token.type : "colorScheme";

        break;
      default:
        formattedToken = handleStringValueTokens(token, dictionary, args);
        break;
    }

    if (formattedToken) {
      if (typeof formattedToken === "string") {
        group =
          args.options.expandFiles[args.options.platform][token.type]?.name ||
          args.options.expandFiles[args.options.platform][token.type] ||
          "default";

        if (!acc[group]) {
          acc[group] = [];
        }

        acc[group].push(formattedToken);
      } else {
        Object.entries(formattedToken).forEach(([tokenSecondaryName, tokenValue]) => {
          group =
            args.options.expandFiles[args.options.platform][token.type][tokenSecondaryName]?.name ||
            args.options.expandFiles[args.options.platform][token.type][tokenSecondaryName] ||
            args.options.expandFiles[args.options.platform][token.type] ||
            "default";

          if (!acc[group]) {
            acc[group] = [];
          }

          if (args.options.expandFiles[args.options.platform][token.type][tokenSecondaryName]) {
            acc[group].push(`${tokenValue}`);
          } else {
            const idx = acc[group].length - 1;

            if (!acc[group][idx]) {
              acc[group][idx] = {};
            }

            acc[group][idx][tokenSecondaryName] = tokenValue;
          }
        });
      }
    }
    return acc;
  }, returnFiles);
}
