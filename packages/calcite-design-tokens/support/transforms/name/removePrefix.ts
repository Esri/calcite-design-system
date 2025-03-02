import { NameTransform } from "style-dictionary/types";
import { RegisterFn } from "../../types/interfaces.js";

export const transformNameRemovePrefix: NameTransform["transform"] = ({ name }, config) => {
  return !config.prefix ? name : name.replace(config.prefix, "");
};

export const registerNameRemovePrefix: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformNameRemovePrefix,
    transform: transformNameRemovePrefix,
    type: "name",
  });
};

export const TransformNameRemovePrefix = "calcite/name/removePrefix";
