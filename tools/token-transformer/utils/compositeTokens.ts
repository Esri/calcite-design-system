import { DeepKeyTokenMap, SingleToken } from '@tokens-studio/types';
import {
  ExpandFilter,
  TransformOptions,
  Expandables,
  ExpandablesAsStrings,
  expandablesAsStringsArr,
} from '../TransformOptions.js';
import { matchPlaceholderElement } from './regex.js';

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
