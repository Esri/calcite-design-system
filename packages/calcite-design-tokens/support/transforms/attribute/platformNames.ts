import { camelCase, kebabCase } from "lodash-es";
import { AttributeTransform } from "style-dictionary/types";
import { RegisterFn } from "../../types/interfaces.js";

export const transformAttributePlatformNames: AttributeTransform["transform"] = (token) => ({
  ...token.attributes,
  names: {
    scss: `$${kebabCase(token.name)}`,
    css: `var(--${kebabCase(token.name)})`,
    js: `${token.path.join(".")}`,
    docs: `${token.path.join(".")}`,
    es6: `${camelCase(token.name)}`,
  },
});

export const registerAttributePlatformNames: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformAttributePlatformNames,
    transform: transformAttributePlatformNames,
    type: "attribute",
  });
};

export const TransformAttributePlatformNames = "calcite/transform/attribute-platform-name";
