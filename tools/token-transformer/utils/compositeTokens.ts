import { ExpandFilter } from "../utils/transformOptions";
import { matchPlaceholderElement } from "./regex.js";
import { DesignToken } from "style-dictionary/types/DesignToken";
import { SingleToken, TokenBoxshadowValue, SingleBoxShadowToken } from "@tokens-studio/types";
import { paramCase } from "change-case";

// A customized type map based off Token Studio.
// This determines the applied "type" associated with each Style Dictionary token value
const typeMaps = {
  boxShadow: {
    x: "dimension",
    y: "dimension",
    blur: "dimension",
    spread: "dimension",
    type: "other",
    color: "color"
  },
  border: {
    width: "border-width",
    style: "other"
  },
  composition: {
    typography: "font-size",
    fontWeight: "font-weight"
  },
  typography: {
    fontFamily: "typography/font-family",
    fontWeight: "typography/font-weights",
    lineHeight: "typography/line-heights",
    fontSize: "typography/font-size",
    letterSpacing: "typography/letter-spacing",
    paragraphSpacing: "typography/paragraph-spacing",
    textDecoration: "typography/text-decoration",
    textCase: "typography/text-case"
  }
};

/**
 * Get type from type map
 * @param {string} key type
 * @param {DesignToken} compositeToken a Style Dictionary token
 * @returns {string} approved token type
 */
export const getType = (key: string, compositeToken: DesignToken): string => typeMaps[compositeToken.type][key] ?? key;

// type ShadowToken = {
//   x: string;
//   y: string;

// }
/**
 * This is a recursive function to dig into composite tokens and lift up the token values in a Style Dictionary format.
 * @param {DesignToken} compositeToken the composite token object
 * @param {boolean} isShadow is a drop shadow?
 * @param {Function} handleValue a function to determine how the final token value string should be passed to Style Dictionary
 * @returns {DesignToken} a single Style Dictionary token object
 */
export function expandToken(compositeToken: DesignToken, isShadow = false, handleValue = (v) => v): DesignToken {
  const expandedObj = {} as DesignToken;

  if (isShadow && Array.isArray(compositeToken.value)) {
    const boxShadowComposite = compositeToken as SingleBoxShadowToken<true | false, { value: TokenBoxshadowValue[] }>;
    boxShadowComposite.value.forEach((shadow: SingleBoxShadowToken["value"], idx) => {
      Object.entries(shadow).forEach(([key, value]) => {
        // Remove "type" from shadow tokens value object
        if (key !== "type") {
          shadow[key] = handleValue(value);
        } else {
          delete shadow[key];
        }
      });
      expandedObj[`${idx}`] = {
        type: boxShadowComposite.type,
        value: shadow
      };
    });

    expandedObj.default = compositeToken;
  } else {
    Object.entries(compositeToken.value).forEach(([key, value]) => {
      const newKey = paramCase(key);
      if (matchPlaceholderElement.test(`${value}`)) {
        return;
      }
      expandedObj[newKey] = {
        value: `${handleValue(value)}`,
        type: getType(key, compositeToken)
      };
    });
    expandedObj["default"] = {
      value: compositeToken.value,
      type: compositeToken.type
    };
  }

  return expandedObj;
}

/**
 *
 * @param {DesignToken} token Style Dictionary token object
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
