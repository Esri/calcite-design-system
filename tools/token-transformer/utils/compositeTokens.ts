import { SingleToken } from "@tokens-studio/types";
import { ExpandFilter } from "@tokens-studio/sd-transforms/dist/TransformOptions.js";
import { matchPlaceholderElement } from "./regex.js";

// A customized type map based off Token Studio.
// This determines the applied "type" associated with each Style Dictionary token value
const typeMaps = {
  boxShadow: {
    x: "dimension",
    y: "dimension",
    blur: "dimension",
    spread: "dimension",
    type: "other"
  },
  border: {
    width: "borderWidth",
    style: "other"
  },
  composition: {
    typography: "fontSizes",
    fontWeight: "fontWeights"
  },
  typography: {
    fontFamily: "fontFamilies",
    fontWeight: "fontWeights",
    lineHeight: "lineHeights",
    fontSize: "fontSizes",
    letterSpacing: "spacing",
    paragraphSpacing: "spacing",
    textDecoration: "fontStyle",
    textCase: "textCase"
  }
};

/**
 * This is a recursive function to dig into composite tokens and lift up the token values in a Style Dictionary format.
 * @param {SingleToken<false>} compositeToken the composite token object
 * @param {boolean} isShadow is a drop shadow?
 * @param {Function} handleValue a function to determine how the final token value string should be passed to Style Dictionary
 * @returns {SingleToken<false>} a single Style Dictionary token object
 */
export function expandToken(
  compositeToken: SingleToken<false>,
  isShadow = false,
  handleValue = (v) => v
): SingleToken<false> {
  const expandedObj = {} as SingleToken<false>;
  const getType = (key: string) => typeMaps[compositeToken.type][key] ?? key;

  if (isShadow && Array.isArray(compositeToken.value)) {
    compositeToken.value.forEach((shadow, index) => {
      expandedObj[index + 1] = {};
      Object.entries(shadow).forEach(([key, value]) => {
        if (matchPlaceholderElement.test(`${value}`)) {
          return;
        }
        expandedObj[index + 1][key] = {
          value: `${handleValue(value)}`,
          type: getType(key)
        };
      });
    });
  } else {
    Object.entries(compositeToken.value).forEach(([key, value]) => {
      if (matchPlaceholderElement.test(`${value}`)) {
        return;
      }
      expandedObj[key] = {
        value: `${handleValue(value)}`,
        type: getType(key)
      };
    });
  }

  return expandedObj;
}

/**
 *
 * @param {SingleToken} token Style Dictionary token object
 * @param {boolean |  ExpandFilter<SingleToken>} condition check if the token should be expanded or not
 * @param {string} filePath the file path where the token came from
 * @returns {boolean} if the token should be expanded
 */
export function shouldExpand<T extends SingleToken>(
  token: T,
  condition: boolean | ExpandFilter<T>,
  filePath: string
): boolean {
  if (typeof condition === "function") {
    return condition(token, filePath);
  }
  return condition;
}
