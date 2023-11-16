// import { handleTypographyToken } from "../expandTokens/typographyValues";
import { Dictionary } from "../../../../types/styleDictionary/dictionary.js";
import { handleColor } from "./handleColor.js";
import { handleStringValueTokens } from "./handleStringValue.js";
import { handleTypography } from "./handleTypography.js";
import { MappedFormatterArguments } from "../utils.js";
import { sortByReference } from "./sortByReference.js";
import { ExpandableTokenTypes } from "../../../../types/tokenTypes/designTokenTypes.js";
import { handleBreakpoint } from "./handleBreakpoint.js";

export type FormattedTokens = Record<string, (string | Record<string, string>)[]>;

export function formatTokens(dictionary: Dictionary, args: MappedFormatterArguments): FormattedTokens {
  const allTokens = [...dictionary.allTokens].sort(sortByReference(dictionary));
  // const formatting = FormattingRules[args.options.platform] || FormattingRules.default;
  // const formattedPlatformVariables: string[] = [];
  const returnFiles: FormattedTokens = {};
  // Format Tokens
  return allTokens.reduce((acc, token) => {
    let group = "default";
    let formattedToken;

    // const formattedToken = createPropertyFormatter(token, dictionary, args);
    switch (token.type) {
      case ExpandableTokenTypes.BREAKPOINT:
        formattedToken = handleBreakpoint(token, dictionary, args);

        // if (breakpoints) {
        //   if (typeof breakpoints === "string") {
        //     acc[group].push(breakpoints);
        //   } else {
        //     Object.values(breakpoints).forEach((breakpointTokenForPlatform) => {
        //       acc[group].push(breakpointTokenForPlatform);
        //     });
        //   }
        // }
        break;
      case ExpandableTokenTypes.TYPOGRAPHY:
        formattedToken = handleTypography(token, args);
        // if (typographyGroup) {
        //   acc[group].push(typographyGroup);
        // }
        break;
      case ExpandableTokenTypes.COLORSCHEME:
      case "color":
        formattedToken = handleColor(token, dictionary, args);
        token.type = typeof formattedToken === "string" ? token.type : "colorScheme";

        // if (typeof colorToken === "string") {
        //   acc["default"].push(colorToken);
        // } else {
        //   Object.entries(colorToken).forEach(([colorScheme, colorSchemeToken]) => {
        //     group = args.options.expandFiles[args.options.platform][token.type][colorScheme];

        //     if (!acc[group]) {
        //       acc[group] = [];
        //     }
        //     acc[group].push(colorSchemeToken);
        //   });
        // }
        break;
      default:
        formattedToken = handleStringValueTokens(token, dictionary, args);
        // acc["default"].push(handleStringValueTokens(token, dictionary, args));
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
