import StyleDictionary from "style-dictionary";
import { registerNameRemoveTier } from "./name/removeTier.js";
import { registerNameRemoveColorMode } from "./name/removeColorMode.js";
import { registerNameIncludePlusMinus } from "./name/includePlusMinus.js";
import { registerValueMathSum } from "./value/mathSum.js";
import { registerValueCSSShadow } from "./value/cssShadow.js";
import { registerValueSizePxToRem } from "./value/pxToRem.js";
import { registerNameRemoveDefault } from "./name/removeDefault.js";
import { registerTransformCalciteGroup } from "./group/calcite.js";
import { registerValueSizeUnitlessToPx } from "./value/unitlessBreakpointToPx.js";
import { registerAttributePlatformNames } from "./attribute/platformNames.js";
import { registerAttributeCalciteSchema } from "./attribute/calciteSchema.js";

export async function registerCalciteTransformers(sd: typeof StyleDictionary): Promise<void> {
  registerValueCSSShadow(sd);
  registerNameRemoveTier(sd);
  registerNameRemoveDefault(sd);
  registerNameRemoveColorMode(sd);
  registerNameIncludePlusMinus(sd);
  registerValueMathSum(sd);
  registerValueSizePxToRem(sd);
  registerValueSizeUnitlessToPx(sd);
  registerTransformCalciteGroup(sd);
  registerAttributePlatformNames(sd);
  registerAttributeCalciteSchema(sd);
}

export { TransformValueCSSShadow } from "./value/cssShadow.js";
export { TransformValueMathSum } from "./value/mathSum.js";
export { TransformValueSizePxToRem } from "./value/pxToRem.js";
export { TransformValueSizeUnitlessToPx } from "./value/unitlessBreakpointToPx.js";
export { TransformNameRemoveTier } from "./name/removeTier.js";
export { TransformNameRemoveDefault } from "./name/removeDefault.js";
export { TransformNameRemoveColorMode } from "./name/removeColorMode.js";
export { TransformNameIncludePlusMinus } from "./name/includePlusMinus.js";
export { TransformCalciteGroup, platformTransforms } from "./group/calcite.js";
export { TransformAttributePlatformNames } from "./attribute/platformNames.js";
export { TransformAttributeCalciteSchema } from "./attribute/calciteSchema.js";
