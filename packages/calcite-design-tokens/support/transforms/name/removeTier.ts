import StyleDictionary, { TransformedToken } from "style-dictionary";

export function transformNamesRemoveTier(token: TransformedToken): string {
  return token.name.replace(/(core|semantic)-?/gi, "");
}

export async function registerNameRemoveTier(sd: typeof StyleDictionary): Promise<void> {
  sd.registerTransform({
    name: TransformNameRemoveTier,
    transform: transformNamesRemoveTier,
    type: "name",
  });
}

export const TransformNameRemoveTier = "calcite/name/removeTier";
