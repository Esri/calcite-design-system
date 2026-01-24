import type { NameTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../../types/interfaces.d.ts";

export const transformNameRemovePrefix: NameTransform["transform"] = ({ name }, config) => {
  return !config.prefix ? name : name.replace(config.prefix, "");
};

export const registerNameRemovePrefix: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformNameRemovePrefix,
    transform: transformNameRemovePrefix,
    type: "name",
  });
};

export const TransformNameRemovePrefix = "calcite/transform/name/remove-prefix";
