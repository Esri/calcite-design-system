import { resolveReference } from "./resolveRelevance.js";
import { typeMap } from "../../../../types/tokenTypes/typeMaps.js";
import { TransformOptions } from "../../../../types/styleDictionary/transformOptions.js";
import {
  DeepKeyTokenMap,
  ExpandableTokenTypes,
  SingleExpandableToken,
  SingleToken,
} from "../../../../types/tokenTypes/designTokenTypes.js";
import { ExpandFilter } from "../../../../types/styleDictionary/expandOptions.js";

export function expandToken(compToken: SingleToken<false>, isShadow = false): SingleToken<false> {
  if (typeof compToken.value !== "object") {
    return compToken;
  }
  const expandedObj = {} as SingleExpandableToken<false>;

  const getType = (key: string) => typeMap[compToken.type][key] ?? key;

  // multi-shadow
  if (isShadow && Array.isArray(compToken.value)) {
    compToken.value.forEach((shadow, index) => {
      expandedObj[index + 1] = {};
      Object.entries(shadow).forEach(([key, value]) => {
        expandedObj[index + 1][key] = {
          value: `${value}`,
          type: getType(key),
        };
      });
    });
  } else {
    Object.entries(compToken.value).forEach(([key, value]) => {
      expandedObj[key] = {
        value: `${value}`,
        type: getType(key),
      };
    });
  }

  return expandedObj;
}

function shouldExpand<T extends SingleToken>(
  token: T,
  condition: boolean | ExpandFilter<T>,
  filePath: string
): boolean {
  if (typeof condition === "function") {
    return condition(token, filePath);
  }
  return condition;
}

function recurse(
  slice: SingleToken<false> | DeepKeyTokenMap<false>,
  copy: DeepKeyTokenMap<false>,
  filePath: string,
  transformOpts: TransformOptions = {}
) {
  const opts = {
    ...transformOpts,
    expand: {
      composition: true,
      typography: false,
      border: false,
      shadow: false,
      colorScheme: false,
    },
  };

  for (const key in slice) {
    const token = slice[key] as SingleToken<false> | DeepKeyTokenMap<false>;
    if (token.value && token.type) {
      if (typeof token.type === "string" && ExpandableTokenTypes[token.type.toUpperCase()]) {
        const expandType = token.type === "boxShadow" ? ExpandableTokenTypes.SHADOW : token.type;
        const expand = shouldExpand<SingleExpandableToken>(
          token as SingleExpandableToken,
          opts.expand[expandType],
          filePath
        );
        if (expand) {
          // if token uses a reference, resolve it
          token.value = resolveReference(token.value, copy);
          slice[key] = expandToken(token, expandType === "shadow");
        }
      } else {
        new Error(`Error: Malformed token. ${token}`);
      }
    } else if (typeof token === "object") {
      recurse(token, copy, filePath, transformOpts);
    } else {
      new Error(`Error unexpected${token}`);
    }
  }
}

export function expandComposites(
  dictionary: DeepKeyTokenMap<false>,
  filePath: string,
  transformOpts?: TransformOptions
): DeepKeyTokenMap<false> {
  const copy = { ...dictionary };
  recurse(copy, copy, filePath, transformOpts);
  return copy;
}
