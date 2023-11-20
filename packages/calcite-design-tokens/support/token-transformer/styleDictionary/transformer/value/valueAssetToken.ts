import { Core as StyleDictionary } from "style-dictionary";
import { Matcher } from "style-dictionary/types/Matcher.js";
import { TransformedToken } from "style-dictionary/types/TransformedToken.js";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export const matcher: Matcher = (token: TransformedToken) => {
  return token.attributes?.category === "asset";
};

export const transformValuesAssetToken: CalledTransformerFunction<string> = (token) => {
  const char1IsQuote = token.value[0] === '"';
  const char2IsQuote = token.value.slice(-1) === '"';
  return char1IsQuote && char2IsQuote ? token.value : `"${token.value}"`;
};

export const registerValueAssetToken = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: valueAssetToken,
    transformer: transformValuesAssetToken,
    type: "value",
    matcher,
  };

  sd.registerTransform(transformerConfig);
};

export const valueAssetToken = "value/calcite/assets";
