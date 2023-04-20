import { DeepKeyTokenMap, SingleToken } from '@tokens-studio/types';
import {
  ExpandFilter,
  TransformOptions,
  Expandables,
  ExpandablesAsStrings,
  expandablesAsStringsArr,
} from '../TransformOptions';

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

const matchingGroup = new RegExp(/\$[.\w-]+/, 'g');
function updateFigmaTokenForSD(value: string | number) {
  let newValue = `${value}`;
  const matchesArr = [...newValue.matchAll(matchingGroup)];
  if (matchesArr.length > 0) {
    matchesArr.forEach((match) => {
      const figmaVariable  = match[0];
      newValue = newValue.replace(figmaVariable, `{${figmaVariable.slice(1)}}`);
    });
  }
  return newValue;
}

const matchPlaceholderElement = new RegExp(/[\[\]]/, 'g');
export function expandToken(compToken: SingleToken<false>, isShadow = false) {
  const expandedObj = {} as SingleToken<false>;
  const getType = (key: string) => typeMaps[compToken.type][key] ?? key;

  if (isShadow && Array.isArray(compToken.value)) {
    compToken.value.forEach((shadow, index) => {
      expandedObj[index + 1] = {};
      Object.entries(shadow).forEach(([key, value]) => {
        if (matchPlaceholderElement.test(`${value}`)) {
          return;
        }
        expandedObj[index + 1][key] = {
          value: `${updateFigmaTokenForSD(value)}`,
          type: getType(key),
        };
      });
    });
  } else {
    Object.entries(compToken.value).forEach(([key, value]) => {
      if (matchPlaceholderElement.test(`${value}`)) {
        return;
      }
      expandedObj[key] = {
        value: `${updateFigmaTokenForSD(value)}`,
        type: getType(key),
      };
    });
  }

  return expandedObj;
}

function shouldExpand<T extends SingleToken>(
  token: T,
  condition: boolean | ExpandFilter<T>,
  filePath: string,
): boolean {
  if (typeof condition === 'function') {
    return condition(token, filePath);
  }
  return condition;
}

function recurse(
  slice: DeepKeyTokenMap<false>,
  filePath: string,
  transformOpts: TransformOptions = {},
): DeepKeyTokenMap<false> {
  const opts = {
    ...transformOpts,
    expand: {
      composition: true,
      typography: false,
      border: false,
      shadow: false,
      ...(transformOpts.expand || {}),
    },
  };

  const returnSlice: DeepKeyTokenMap<false> = {};

  const newToken = Object.entries(slice).reduce((acc, [key, token]) => {
    const { type } = token;
    if (matchPlaceholderElement.test(`${key}`) || (typeof matchPlaceholderElement.test(`${token.value}`)) === 'string' && matchPlaceholderElement.test(`${token.value}`)) {
      return acc;
    }
    
    if (token.value && type) {
      if (typeof type === 'string' && expandablesAsStringsArr.includes(type)) {
        const expandType = (type as ExpandablesAsStrings) === 'boxShadow' ? 'shadow' : type;
        const expand = shouldExpand<Expandables>(
          token as Expandables,
          opts.expand[expandType],
          filePath,
        );
        if (expand) {
          if (filePath.includes('semantic')) {
            debugger;
          }
          const expandedToken = expandToken(token as SingleToken<false>, expandType === 'shadow');
          acc[key] = expandedToken;
        }
      } else {
        token['value'] = updateFigmaTokenForSD(token.value as string);
        acc[key] = token;
      }
    } else if (typeof token === 'object') {
      // TODO: figure out why we have to hack this typecast, if a value doesn't have a value & type,
      // it is definitely a nested DeepKeyTokenMap and not a SingleToken, but TS seems to think it must be
      // a SingleToken after this if statement
      acc[key] = recurse(token as unknown as DeepKeyTokenMap<false>, filePath, transformOpts);
    }
    return acc;
  }, returnSlice);

  return newToken;
}

export function expandComposites(
  dictionary: DeepKeyTokenMap<false>,
  filePath: string,
  transformOpts?: TransformOptions,
): DeepKeyTokenMap<false> {
  const copy = recurse({ ...dictionary }, filePath, transformOpts);
  return copy;
}
