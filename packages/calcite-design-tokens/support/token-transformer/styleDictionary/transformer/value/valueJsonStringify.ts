import { Core as StyleDictionary } from "style-dictionary";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";
import { Matcher } from "style-dictionary/types/Matcher.js";

export const matcher: Matcher = (token) => {
  return typeof token.value !== "string";
};

export const transformValueJsonStringify: CalledTransformerFunction<string> = (token) => {
  return JSON.stringify(token.value);
};

export const registerValueJsonStringify = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: CalciteValueJsonStringify,
    transformer: transformValueJsonStringify,
    type: "value",
    transitive: true,
    matcher,
  };

  sd.registerTransform(transformerConfig);
};

export const CalciteValueJsonStringify = "value/calcite/jsonStringify";
