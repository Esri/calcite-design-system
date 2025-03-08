import { NameTransform } from "style-dictionary/types";
import { RegisterFn } from "../../types/interfaces.js";

export const transformNamesRemoveTier: NameTransform["transform"] = (token) =>
  token.name.replace(/(core|semantic)-?/gi, "");

export const registerNameRemoveTier: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformNameRemoveTier,
    transform: transformNamesRemoveTier,
    type: "name",
  });
};

export const TransformNameRemoveTier = "calcite/name/removeTier";
