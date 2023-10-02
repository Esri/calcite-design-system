import { DeepKeyTokenMap, SingleToken } from "@tokens-studio/types";
import getReferences from "style-dictionary/lib/utils/references/getReferences.js";
import usesReference from "style-dictionary/lib/utils/references/usesReference.js";
import {
  ExpandFilter,
  TransformOptions,
  Expandables,
  ExpandablesAsStrings,
  expandablesAsStringsArr
} from "../utils/transformOptions.js";

const typeMaps = {
  boxShadow: {
    x: "dimension",
    y: "dimension",
    blur: "dimension",
    spread: "dimension",
    type: "shadow"
  },
  border: {
    width: "borderWidth",
    style: "other"
  },
  composition: {},
  typography: {
    fontFamily: "fontFamilies",
    fontWeights: "fontWeights",
    lineHeight: "lineHeights",
    fontSize: "fontSizes",
    fontStyle: "fontStyles"
  }
};

export function expandToken(compToken: SingleToken<false>, isShadow = false): SingleToken<false> {
  const expandedObj = {} as SingleToken<false>;

  const getType = (key: string) => typeMaps[compToken.type][key] ?? key;

  // multi-shadow
  if (isShadow && Array.isArray(compToken.value)) {
    compToken.value.forEach((shadow, index) => {
      expandedObj[index + 1] = {};
      Object.entries(shadow).forEach(([key, value]) => {
        if (key === "type") {
          const newValue = { ...shadow };
          delete newValue.type;
          expandedObj[index + 1]["default"] = {
            value: newValue,
            type: getType(key)
          };
        } else {
          expandedObj[index + 1][key] = {
            value: `${value}`,
            type: getType(key)
          };
        }
      });
    });
  } else {
    Object.entries(compToken.value).forEach(([key, value]) => {
      if (key === "type" && typeof compToken.value === "object") {
        const newValue = { ...compToken.value };
        delete newValue["type"];
        expandedObj["default"] = {
          value: newValue,
          type: getType(key)
        };
      } else {
        expandedObj[key] = {
          value: `${value}`,
          type: getType(key)
        };
      }
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
  slice: DeepKeyTokenMap<false>,
  filePath: string,
  transformOpts: TransformOptions = {},
  boundGetRef: (ref: string) => Array<SingleToken<false>>
) {
  const opts = {
    ...transformOpts,
    expand: {
      composition: true,
      typography: false,
      border: false,
      shadow: false,
      ...(transformOpts.expand || {})
    }
  };

  for (const key in slice) {
    const token = slice[key];
    const { type } = token;
    if (token.value && type) {
      if (typeof type === "string" && expandablesAsStringsArr.includes(type)) {
        const expandType = (type as ExpandablesAsStrings) === "boxShadow" ? "shadow" : type;
        const expand = shouldExpand<Expandables>(token as Expandables, opts.expand[expandType], filePath);
        if (expand) {
          // if token uses a reference, resolve it
          if (typeof token.value === "string" && usesReference(token.value)) {
            let ref = { value: token.value } as SingleToken<false>;
            while (ref && ref.value && typeof ref.value === "string" && usesReference(ref.value)) {
              // boundGetRef = getReferences() but bound to this style-dictionary object during parsing
              // this spits back either { value: '{deepRef}' } if it's a nested reference or
              // the object value (typography/composition/border/shadow)
              // However, when it's the final resolved value, the props are as { value, type }
              // instead of just the value, so we use a map to grab only the value...
              try {
                ref = Object.fromEntries(
                  Object.entries(boundGetRef(ref.value)[0]).map(([k, v]) => [k, v.value])
                ) as SingleToken<false>;
              } catch (error) {
                console.warn(`Warning: could not resolve reference ${ref.value}`);
                return;
              }
            }
            token.value = ref as SingleToken<false>["value"];
          }
          slice[key] = expandToken(token, expandType === "shadow");
        }
      }
    } else if (typeof token === "object") {
      // TODO: figure out why we have to hack this typecast, if a value doesn't have a value & type,
      // it is definitely a nested DeepKeyTokenMap and not a SingleToken, but TS seems to think it must be
      // a SingleToken after this if statement
      recurse(token as unknown as DeepKeyTokenMap<false>, filePath, transformOpts, boundGetRef);
    }
  }
}

export function expandComposites(
  dictionary: DeepKeyTokenMap<false>,
  filePath: string,
  transformOpts?: TransformOptions
): DeepKeyTokenMap<false> {
  const copy = { ...dictionary };
  const boundGetRef = getReferences.bind({ properties: copy });
  recurse(copy, filePath, transformOpts, boundGetRef);
  return copy;
}
