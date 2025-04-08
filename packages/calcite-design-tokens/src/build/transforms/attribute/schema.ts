import type { AttributeTransform, PlatformConfig } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

export const transformAttributeSchema: AttributeTransform["transform"] = (token, config: PlatformConfig) => ({
  ...token.attributes,
  "calcite-schema": {
    system: config.prefix,
    tier: token.filePath.split("/").at(-2),
    type: token.original.type,
  },
});

export const registerAttributeSchema: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformAttributeSchema,
    transform: transformAttributeSchema,
    type: "attribute",
  });
};

export const TransformAttributeSchema = "calcite/transform/attribute/schema";
