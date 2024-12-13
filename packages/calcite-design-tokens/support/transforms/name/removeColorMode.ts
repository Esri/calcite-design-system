import StyleDictionary, { TransformedToken } from "style-dictionary";

export function transformNamesRemoveColorMode(token: TransformedToken): string {
  if (token.type === "dark" || token.type === "light") {
    return token.name.replace(/-(light|dark)$/, "");
  }
  return token.name;
}

export function registerNameRemoveColorMode(sd: StyleDictionary): void {
  sd.registerTransform({
    name: nameRemoveColorMode,
    transform: transformNamesRemoveColorMode,
    type: "name",
  });
}

export const nameRemoveColorMode = "calcite/name/removeColorMode";
