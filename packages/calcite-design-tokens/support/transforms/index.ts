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
import { registerAttributeSchema } from "./attribute/schema.js";
import { registerNameCapitalCase } from "./name/capitalCase.js";
import { registerNameRemovePrefix } from "./name/removePrefix.js";
import { registerValueMergeValues } from "./value/mergeValue.js";
import { registerValueEnsureType } from "./value/ensureType.js";

export async function registerCalciteTransformers(sd: typeof StyleDictionary): Promise<void> {
  await Promise.all([
    registerValueCSSShadow(sd),
    registerValueMergeValues(sd),
    registerNameRemoveTier(sd),
    registerNameRemoveDefault(sd),
    registerNameRemoveColorMode(sd),
    registerNameRemovePrefix(sd),
    registerNameIncludePlusMinus(sd),
    registerNameCapitalCase(sd),
    registerValueMathSum(sd),
    registerValueSizePxToRem(sd),
    registerValueSizeUnitlessToPx(sd),
    registerValueEnsureType(sd),
    registerAttributePlatformNames(sd),
    registerAttributeSchema(sd),
    registerTransformCalciteGroup(sd),
  ]);
}

export { TransformValueCSSShadow } from "./value/cssShadow.js";
export { TransformValueMathSum } from "./value/mathSum.js";
export { TransformValueSizePxToRem } from "./value/pxToRem.js";
export { TransformValueSizeUnitlessToPx } from "./value/unitlessBreakpointToPx.js";
export { TransformValueMergeValues } from "./value/mergeValue.js";
export { TransformValueEnsureType } from "./value/ensureType.js";
export { TransformNameRemoveTier } from "./name/removeTier.js";
export { TransformNameRemoveDefault } from "./name/removeDefault.js";
export { TransformNameRemoveColorMode } from "./name/removeColorMode.js";
export { TransformNameRemovePrefix } from "./name/removePrefix.js";
export { TransformNameIncludePlusMinus } from "./name/includePlusMinus.js";
export { TransformNameCapitalCase } from "./name/capitalCase.js";
export { TransformCalciteGroup, platformTransforms } from "./group/calcite.js";
export { TransformAttributePlatformNames } from "./attribute/platformNames.js";
export { TransformAttributeSchema } from "./attribute/schema.js";
