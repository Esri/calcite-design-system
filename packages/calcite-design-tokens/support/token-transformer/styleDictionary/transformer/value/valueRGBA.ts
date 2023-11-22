import { Core as StyleDictionary } from "style-dictionary";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";
import { hexToRgb } from "../utils/hexToRGBA.js";
import { Matcher } from "style-dictionary/types/Matcher.js";

const matchRGBA = (value: string) => value.match(/(rgba?).+(\#[0-9A-z]+)/g);

export const matcher: Matcher = (token) => {
  if (typeof token.value === "string") {
    return !!matchRGBA(token.value);
  }

  if (typeof token.value !== "string") {
    const keys = Object.keys(token.value);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = token.value[key];

      return !!matchRGBA(`${value}`);
    }
  }

  return false;
};

export const transformHexStringToRGBA = (value: string): string => {
  const result = /(\#([A-f\d]{2}){1,6})/i.exec(value);
  if (result) {
    const rgba = hexToRgb(result[0]);
    return rgba && value.replace(result[0], Object.values(rgba).join(", "));
  }
  return value;
};

export const transformValueRGBA: CalledTransformerFunction<string> = (token) => {
  if (typeof token.original.value === "string") {
    const match = matchRGBA(token.value);
    if (match) {
      token.value = transformHexStringToRGBA(token.original.value);
    }
  }

  if (typeof token.value !== "string") {
    const valueKeys = Object.keys(token.value);

    if (valueKeys && valueKeys.length > 0) {
      for (let i = 0; i < valueKeys.length; i++) {
        const key = valueKeys[i];
        const value = `${token.value[key]}`;
        const match = matchRGBA(value);

        if (match) {
          const v = transformHexStringToRGBA(value);
          token.value[key] = v;
        }
      }
    }
  }

  return token.value;
};

export const registerValueRGBA = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: CalciteValueRGBA,
    transformer: transformValueRGBA,
    type: "value",
    transitive: true,
    matcher,
  };

  sd.registerTransform(transformerConfig);
};

export const CalciteValueRGBA = "value/calcite/rgba";
