import { camelCase, kebabCase } from "lodash-es";
import { AttributeTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

export const transformAttributePlatformNames: AttributeTransform["transform"] = (token) => {
  const isKebab = token.name.includes("-");
  const kebabName = isKebab ? token.name : kebabCase(token.name);
  const camelCaseName = isKebab ? camelCase(token.name) : token.name;

  return {
    ...token.attributes,
    names: {
      scss: `$${kebabName}`,
      css: `var(--${kebabName})`,
      js: `${token.path.join(".")}`,
      docs: `${token.path.join(".")}`,
      es6: `${camelCaseName}`,
    },
  };
};

export const registerAttributePlatformNames: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformAttributePlatformNames,
    transform: transformAttributePlatformNames,
    type: "attribute",
  });
};

export const TransformAttributePlatformNames = "calcite/transform/attribute/platform-name";
