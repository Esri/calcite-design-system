import { TransformedToken } from "style-dictionary";
import { PlatformConfig } from "style-dictionary/types";
import { RegisterFn } from "../../types/interfaces.js";

interface Schema {
  system: string;
  type: string;
}

export function transformAttributeCalciteSchema(
  token: TransformedToken,
  config: PlatformConfig,
): Record<"calcite-schema", Schema> {
  return {
    ...token.attributes,
    "calcite-schema": {
      system: config.prefix,
      type: token.original.type,
    },
  };
}

export const registerAttributeCalciteSchema: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformAttributeCalciteSchema,
    transform: transformAttributeCalciteSchema,
    type: "attribute",
  });
};

export const TransformAttributeCalciteSchema = "calcite/transform/attribute-calcite-schema";
