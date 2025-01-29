import StyleDictionary, { TransformedToken } from "style-dictionary";

export function transformNamesRemoveColorMode(token: TransformedToken): string {
  const colorModeRegex = /-?(light|dark)$/;
  if (colorModeRegex.test(token.name) || token.type === "dark" || token.type === "light") {
    return token.name.replace(colorModeRegex, "");
  }

  return token.name;
}

export async function registerNameRemoveColorMode(sd: typeof StyleDictionary): Promise<void> {
  sd.registerTransform({
    name: TransformNameRemoveColorMode,
    transform: transformNamesRemoveColorMode,
    type: "name",
    filter: (token) => token.original.type === "color",
  });
}

export const TransformNameRemoveColorMode = "calcite/name/removeColorMode";
