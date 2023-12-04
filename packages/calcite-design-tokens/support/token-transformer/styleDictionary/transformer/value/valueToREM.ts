import { Core as StyleDictionary } from "style-dictionary";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";
import { Matcher } from "style-dictionary/types/Matcher.js";

export const matcher: Matcher = (token) => {
  if (!["lineHeights"].includes(token.type)) {
    return false;
  }

  return true;
};

export const transformToREM: CalledTransformerFunction<string> = (token) => {
  if (typeof token.value === "string") {
    const val = Number(token.value.replace("%", ""));
    if (!isNaN(val)) {
      return `${val * 0.01}`;
    }
  }

  return token.value;
};

export const registerValueToREM = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: CalciteValueToREM,
    transformer: transformToREM,
    type: "value",
    transitive: true,
    matcher,
  };

  sd.registerTransform(transformerConfig);
};

export const CalciteValueToREM = "value/calcite/rem";
