import { NameTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

export const transformNamesRemoveColorMode: NameTransform["transform"] = (token) => {
  const colorModeRegex = /-?(light|dark)$/;
  if (colorModeRegex.test(token.name) || token.type === "dark" || token.type === "light") {
    return token.name.replace(colorModeRegex, "");
  }

  return token.name;
};

export const registerNameRemoveColorMode: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformNameRemoveColorMode,
    transform: transformNamesRemoveColorMode,
    type: "name",
    filter: (token) => token.original.type === "color",
  });
};

export const TransformNameRemoveColorMode = "calcite/transform/name/remove-color-mode";
