import { TransformedToken } from "style-dictionary";
import type { NameTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

const defaultPart = "default";

export const transformNameRemoveDefault: NameTransform["transform"] = (token) => {
  let name = token.name;

  token.path.forEach((path) => {
    if (path === defaultPart) {
      name = name.replace(/-{0,1}default/i, "");
    }
  });

  return name;
};

function filterByPathIncludesDefault(token: TransformedToken): boolean {
  return token.path.includes(defaultPart);
}

export const registerNameRemoveDefault: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformNameRemoveDefault,
    transform: transformNameRemoveDefault,
    type: "name",
    filter: filterByPathIncludesDefault,
  });
};

export const TransformNameRemoveDefault = "calcite/transform/name/remove-default";
