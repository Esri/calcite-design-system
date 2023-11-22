import { Core as StyleDictionary } from "style-dictionary";
import { Matcher } from "style-dictionary/types/Matcher.js";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export const matcher: Matcher = (token) => {
  return typeof token.value === "string" && token.value.includes(" ");
};

export const transformValuesStringWrapper: CalledTransformerFunction<string> = (token) => {
  return `"${token.value}"`;
};

export const registerValueStringWrapper = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: valueStringWrapper,
    transformer: transformValuesStringWrapper,
    type: "value",
    matcher,
  };

  sd.registerTransform(transformerConfig);
};

export const valueStringWrapper = "value/calcite/value-string-wrapper";
