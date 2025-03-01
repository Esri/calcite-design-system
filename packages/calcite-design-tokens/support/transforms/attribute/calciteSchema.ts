import { AttributeTransform, PlatformConfig } from "style-dictionary/types";
import { RegisterFn } from "../../types/interfaces.js";

export const transformAttributeCalciteSchema: AttributeTransform["transform"] = (token, config: PlatformConfig) => ({
  ...token.attributes,
  "calcite-schema": {
    system: config.prefix,
    type: token.original.type,
  },
});

export const registerAttributeCalciteSchema: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformAttributeCalciteSchema,
    transform: transformAttributeCalciteSchema,
    type: "attribute",
  });
};

export const TransformAttributeCalciteSchema = "calcite/transform/attribute-calcite-schema";
