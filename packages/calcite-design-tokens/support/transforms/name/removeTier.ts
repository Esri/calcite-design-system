import { TransformedToken } from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

export function transformNamesRemoveTier(token: TransformedToken): string {
  return token.name.replace(/(core|semantic)-?/gi, "");
}

export const registerNameRemoveTier: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformNameRemoveTier,
    transform: transformNamesRemoveTier,
    type: "name",
  });
};

export const TransformNameRemoveTier = "calcite/name/removeTier";
