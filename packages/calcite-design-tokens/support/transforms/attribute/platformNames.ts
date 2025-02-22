import { camelCase, kebabCase } from "lodash-es";
import StyleDictionary, { TransformedToken } from "style-dictionary";

export function transformAttributePlatformNames(token: TransformedToken): Record<"names", Record<string, string>> {
  return {
    names: {
      scss: `$${kebabCase(token.name)}`,
      css: `var(--${kebabCase(token.name)})`,
      js: `${token.path.join(".")}`,
      docs: `${token.path.join(".")}`,
      es6: `${camelCase(token.name)}`,
    },
  };
}

export async function registerAttributePlatformNames(sd: typeof StyleDictionary): Promise<void> {
  sd.registerTransform({
    name: TransformAttributePlatformNames,
    transform: transformAttributePlatformNames,
    type: "attribute",
  });
}

export const TransformAttributePlatformNames = "calcite/transform/platform-name";
