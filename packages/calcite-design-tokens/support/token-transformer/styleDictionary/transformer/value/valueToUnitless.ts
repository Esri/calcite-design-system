// @ts-strict-ignore
import { Core as StyleDictionary } from "style-dictionary";
import { Matcher } from "style-dictionary/types/Matcher.js";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export const matcher: Matcher = (token) => {
  const matchingRegex = /lineHeight/g;

  return matchingRegex.test(token.type) && !token.path.includes("fixed");
};

export const transformToUnitless: CalledTransformerFunction<string> = (token) => {
  const regex = /[px%]/g;

  if (typeof token.value === "string") {
    let returnValue = Number(token.value.replace(regex, ""));

    if (!isNaN(returnValue)) {
      if (token.value.includes("%")) {
        returnValue = returnValue * 0.01;
      }

      return `${returnValue}`;
    }
  }

  return token.value;
};

export const registerValueToUnitless = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: CalciteValueToUnitless,
    transformer: transformToUnitless,
    type: "value",
    transitive: true,
    matcher,
  };

  sd.registerTransform(transformerConfig);
};

export const CalciteValueToUnitless = "value/calcite/unitless";
