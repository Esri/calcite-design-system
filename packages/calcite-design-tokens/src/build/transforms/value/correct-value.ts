import { Filter, ValueTransform } from "style-dictionary/types";
import { RegisterFn } from "../../types/interfaces.js";

const correctedValueTypes = ["fontWeight"] as const;
const filterTypes: Filter["filter"] = (token) => correctedValueTypes.includes(token.type);

const transformValueCorrectValue: ValueTransform["transform"] = async (token) => {
  if (token.type === "fontWeight") {
    if (token.value.toLowerCase() === "demi") {
      return "DemiBold";
    }
  }

  return token.value;
};

export const registerValueCorrectValue: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformValueCorrectValue,
    type: "value",
    transitive: true,
    filter: filterTypes,
    transform: transformValueCorrectValue,
  });
};

export const TransformValueCorrectValue = "calcite/transform/value/correct-value";
