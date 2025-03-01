import { AttributeTransform, PlatformConfig } from "style-dictionary/types";
import { RegisterFn } from "../../types/interfaces.js";

export const transformAttributeSchema: AttributeTransform["transform"] = (token, config: PlatformConfig) => ({
  ...token.attributes,
  "calcite-schema": {
    system: config.prefix,
    type: token.original.type,
  },
});

export const registerAttributeSchema: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformAttributeSchema,
    transform: transformAttributeSchema,
    type: "attribute",
  });
};

export const TransformAttributeSchema = "calcite/transform/attribute-schema";
