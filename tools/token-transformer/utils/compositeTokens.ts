import { SingleToken } from '@tokens-studio/types';
import {
  ExpandFilter
} from '../TransformOptions.js';
import { matchPlaceholderElement } from './regex.js';

// A customized type map based off Token Studio. 
// This determines the applied "type" associated with each Style Dictionary token value
const typeMaps = {
  boxShadow: {
    x: 'dimension',
    y: 'dimension',
    blur: 'dimension',
    spread: 'dimension',
    type: 'other',
  },
  border: {
    width: 'borderWidth',
    style: 'other',
  },
  composition: {
    typography: 'fontSizes',
    fontWeight: 'fontWeights',
  },
  typography: {
    fontFamily: 'fontFamilies',
    fontWeight: 'fontWeights',
    lineHeight: 'lineHeights',
    fontSize: 'fontSizes',
    letterSpacing: 'spacing',
    paragraphSpacing: 'spacing',
    textDecoration: 'fontStyle',
    textCase: 'textCase',
  },
};

/**
 * This is a recursive function to dig into composite tokens and lift up the token values in a Style Dictionary format.
 * Composite token example
 *  "box-shadow": {
 *    "0": {
 *      "value": {
 *        "x": "0",
 *        "y": "0",
 *        "blur": "0",
 *        "spread": "0",
 *        "color": "rgba($core.color.neutral.blk-240, $core.opacity.0)",
 *        "type": "dropShadow"
 *      },
 *      "type": "boxShadow"
 *    },
 * }
 * 
 * will become...
 * 
 * "box-shadow": {
 *    "0": {
 *      "x": {
 *        "value": "0",
 *        "type": "dropShadow"
 *      },
 *      "y": {
 *        "value": "0",
 *        "type": "dropShadow"
 *      },
 *      "blur": {
 *        "value": "0",
 *        "type": "dropShadow"
 *      },
 *      "spread": {
 *        "value": "0",
 *        "type": "dropShadow"
 *      },
 *      "color": {
 *        "value": "rgba($core.color.neutral.blk-240, $core.opacity.0)",
 *        "type": "dropShadow"
 *      },
 *    },
 * }
 * 
 * @param compositeToken the composite token object
 * @param isShadow is a drop shadow?
 * @param handleValue a function to determine how the final token value string should be passed to Style Dictionary
 * @returns 
 */
export function expandToken(compositeToken: SingleToken<false>, isShadow = false, handleValue = (v) => v) {
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
          type: getType(key),
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
        type: getType(key),
      };
    });
  }

  return expandedObj;
}

/**
 * 
 * @param token Style Dictionary token object
 * @param condition check if the token should be expanded or not
 * @param filePath the file path where the token came from
 * @returns boolean
 */
export function shouldExpand<T extends SingleToken>(
  token: T,
  condition: boolean | ExpandFilter<T>,
  filePath: string,
): boolean {
  if (typeof condition === 'function') {
    return condition(token, filePath);
  }
  return condition;
}
