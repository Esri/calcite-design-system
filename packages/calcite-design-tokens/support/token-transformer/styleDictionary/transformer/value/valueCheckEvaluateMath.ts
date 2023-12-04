import { Core as StyleDictionary } from "style-dictionary";
import { checkAndEvaluateMath } from "@tokens-studio/sd-transforms";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export function evaluateMathInValue(value: any): any {
  if (Array.isArray(value)) {
    return value.map((v) => evaluateMathInValue(v));
  }

  if (value === Object(value)) {
    return Object.entries(value).reduce((acc, [k, v]) => {
      acc[k] = evaluateMathInValue(v);
      return acc;
    }, {} as Record<string, any>);
  }

  return typeof value === "string" || typeof value === "number" ? `${checkAndEvaluateMath(`${value}`)}` : value;
}

export const transformValuesEvaluateMath: CalledTransformerFunction<any> = (token) => {
  return evaluateMathInValue(token.value);
};

export const registerValueEvaluateMath = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: valueEvaluateMath,
    transformer: transformValuesEvaluateMath,
    transitive: true,
    type: "value",
  };

  sd.registerTransform(transformerConfig);
};

export const valueEvaluateMath = "value/calcite/evaluate-math";
