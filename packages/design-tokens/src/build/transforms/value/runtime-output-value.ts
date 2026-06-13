import type { Filter, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../../types/interfaces.d.ts";

const runtimeValueExtension = "calcite.runtimeOutputValue";

const filterRuntimeOutputTokens: Filter["filter"] = (token) =>
  typeof token.$value === "string" && typeof token.original?.extensions?.[runtimeValueExtension] === "string";

const transformValueRuntimeOutputValue: ValueTransform["transform"] = async (token) => {
  return token.original.extensions[runtimeValueExtension];
};

export const registerValueRuntimeOutputValue: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformValueRuntimeOutputValue,
    type: "value",
    transitive: true,
    filter: filterRuntimeOutputTokens,
    transform: transformValueRuntimeOutputValue,
  });
};

export const TransformValueRuntimeOutputValue = "calcite/transform/value/runtime-output-value";
