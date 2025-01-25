import StyleDictionary, { TransformedToken } from "style-dictionary";

export function transformNamesRemoveTier(token: TransformedToken): string {
  return token.name.replace(/(core|semantic)-?/gi, "");
}

export function registerNameRemoveTier(sd: typeof StyleDictionary): void {
  sd.registerTransform({
    name: nameRemoveTier,
    transform: transformNamesRemoveTier,
    type: "name",
  });
}

export const nameRemoveTier = "calcite/name/removeTier";
