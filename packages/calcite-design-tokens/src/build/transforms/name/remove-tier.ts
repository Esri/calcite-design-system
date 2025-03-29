import { NameTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

export const transformNamesRemoveTier: NameTransform["transform"] = (token) =>
  token.name.replace(/(core|semantic)-?/gi, "");

export const registerNameRemoveTier: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformNameRemoveTier,
    transform: transformNamesRemoveTier,
    type: "name",
  });
};

export const TransformNameRemoveTier = "calcite/transform/name/remove-tier";
