import StyleDictionary, { TransformedToken } from "style-dictionary";

export function transformNamesRemoveColorMode(token: TransformedToken): string {
  const colorModeRegex = /-?(light|dark)$/;
  if (colorModeRegex.test(token.name) || token.type === "dark" || token.type === "light") {
    return token.name.replace(colorModeRegex, "");
  }

  return token.name;
}

export function registerNameRemoveColorMode(sd: typeof StyleDictionary): void {
  sd.registerTransform({
    name: nameRemoveColorMode,
    transform: transformNamesRemoveColorMode,
    type: "name",
    filter: (token) => token.original.type === "color",
  });
}

export const nameRemoveColorMode = "calcite/name/removeColorMode";
