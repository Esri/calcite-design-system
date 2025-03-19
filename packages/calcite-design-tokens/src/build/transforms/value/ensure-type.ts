import { Filter, ValueTransform } from "style-dictionary/types";
import { ArrayValues } from "type-fest";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

const stringValueTokenTypes = ["fontWeight", "dimension", "lineHeight", "opacity", "z-index"] as const;
const filterTypes: Filter["filter"] = (token) =>
  stringValueTokenTypes.includes(token.type as ArrayValues<typeof stringValueTokenTypes>);

const transformValueEnsureType: ValueTransform["transform"] = async (token) => {
  return `${token.value}`;
};

export const registerValueEnsureType: RegisterFn = async () => {
  StyleDictionary.registerTransform({
    name: TransformValueEnsureType,
    type: "value",
    transitive: true,
    filter: filterTypes,
    transform: transformValueEnsureType,
  });
};

export const TransformValueEnsureType = "calcite/transform/value/ensure-type";
