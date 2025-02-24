import StyleDictionary, { TransformedToken } from "style-dictionary";
import { PlatformConfig } from "style-dictionary/types";

export function transformAttributeCalciteSchema(
  token: TransformedToken,
  config: PlatformConfig,
): Record<"calcite-schema", Record<string, string>> {
  return {
    ...token.attributes,
    "calcite-schema": {
      system: config.prefix,
      type: token.original.type,
    },
  };
}

export async function registerAttributeCalciteSchema(sd: typeof StyleDictionary): Promise<void> {
  sd.registerTransform({
    name: TransformAttributeCalciteSchema,
    transform: transformAttributeCalciteSchema,
    type: "attribute",
  });
}

export const TransformAttributeCalciteSchema = "calcite/transform/attribute-calcite-schema";
