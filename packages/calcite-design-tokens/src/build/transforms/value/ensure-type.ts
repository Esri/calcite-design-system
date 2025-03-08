import { Filter, ValueTransform } from "style-dictionary/types";
import { RegisterFn } from "../../types/interfaces.js";

const stringValueTokenTypes = ["fontWeight", "opacity", "typography", "z-index"] as const;
const filterTypes: Filter["filter"] = (token) => stringValueTokenTypes.includes(token.type);

const transformValueEnsureType: ValueTransform["transform"] = async (token) => {
  return `${token.value}`;
};

export const registerValueEnsureType: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformValueEnsureType,
    type: "value",
    transitive: true,
    filter: filterTypes,
    transform: transformValueEnsureType,
  });
};

export const TransformValueEnsureType = "calcite/transform/value/ensure-type";
