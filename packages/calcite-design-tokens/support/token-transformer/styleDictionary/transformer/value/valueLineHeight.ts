import { Core as StyleDictionary } from "style-dictionary";
import { Matcher } from "style-dictionary/types/Matcher.js";
import { TransformedToken } from "style-dictionary/types/TransformedToken.js";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export const matcher: Matcher = (token: TransformedToken) => {
  return token.type === "lineHeights" && token.value.includes("%");
};

export const transformValueLineHeight: CalledTransformerFunction<number> = (token) => {
  const num = Number(token.value.replace("%", ""));

  return isNaN(num) ? token.value : num * 0.01;
};

export const registerValueLineHeight = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: valueLineHeight,
    transformer: transformValueLineHeight,
    type: "value",
    transitive: true,
    matcher,
  };

  sd.registerTransform(transformerConfig);
};

export const valueLineHeight = "value/calcite/line-height";
