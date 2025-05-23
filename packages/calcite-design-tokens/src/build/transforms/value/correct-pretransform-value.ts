import type { Filter, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../../types/interfaces.js";

const correctedValueTypes = ["fontWeight"] as const;
const filterTypes: Filter["filter"] = (token) => correctedValueTypes.includes(token.type);

const transformValueCorrectPreprocessValue: ValueTransform["transform"] = async (token) => {
  if (token.type === "fontWeight") {
    if (token.value.toLowerCase() === "demi") {
      return "DemiBold";
    }
  }

  return token.value;
};

export const registerValueCorrectPreprocessValue: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformValueCorrectPreprocessValue,
    type: "value",
    transitive: true,
    filter: filterTypes,
    transform: transformValueCorrectPreprocessValue,
  });
};

export const TransformValueCorrectPreprocessValue = "calcite/transform/value/correct-preprocess-value";
