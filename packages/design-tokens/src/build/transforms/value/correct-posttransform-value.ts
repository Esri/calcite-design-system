import type { Filter, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../../types/interfaces.js";

const correctedValueTypes = ["fontFamily"] as const;
const filterTypes: Filter["filter"] = (token) => correctedValueTypes.includes(token.type);

const transformValueCorrectPostprocessValue: ValueTransform["transform"] = async (token) => {
  if (token.type === "fontFamily" && token.value.includes(",")) {
    // used to preserve the value type – should be removed at a breaking change release when font family type can change to string
    return token.value.split(",");
  }

  return token.value;
};

export const registerValueCorrectPostprocessValue: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformValueCorrectPostprocessValue,
    type: "value",
    transitive: true,
    filter: filterTypes,
    transform: transformValueCorrectPostprocessValue,
  });
};

export const TransformValueCorrectPostprocessValue = "calcite/transform/value/correct-postprocess-value";
