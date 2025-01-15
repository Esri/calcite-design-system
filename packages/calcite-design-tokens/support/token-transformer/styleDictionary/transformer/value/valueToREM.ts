// @ts-strict-ignore
import { Core as StyleDictionary } from "style-dictionary";
import { Matcher } from "style-dictionary/types/Matcher.js";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export const matcher: Matcher = (token) => {
  const matchingRegex = /dimension/g;

  return matchingRegex.test(token.type);
};

export const transformToREM: CalledTransformerFunction<string> = (token) => {
  const basePxFontSize = 16;
  const regex = /[px%]/g;

  if (typeof token.value === "string") {
    let returnValue = Number(token.value.replace(regex, ""));

    if (!isNaN(returnValue)) {
      if (token.value.includes("%")) {
        returnValue = returnValue * 0.01;
      }

      return `${returnValue / basePxFontSize}rem`;
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
