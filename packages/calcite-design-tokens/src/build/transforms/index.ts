import StyleDictionary from "style-dictionary";
import { registerNameRemoveTier } from "./name/remove-tier.js";
import { registerNameRemoveColorMode } from "./name/remove-color-mode.js";
import { registerNameIncludePlusMinus } from "./name/include-plus-minus.js";
import { registerValueMathSum } from "./value/math-sum.js";
import { registerValueCSSShadow } from "./value/css-shadow.js";
import { registerValueSizePxToRem } from "./value/px-to-rem.js";
import { registerNameRemoveDefault } from "./name/remove-default.js";
import { registerTransformCalciteGroup } from "./group/calcite.js";
import { registerValueSizeUnitlessToPx } from "./value/unitless-breakpoint-to-px.js";
import { registerAttributePlatformNames } from "./attribute/platform-names.js";
import { registerAttributeSchema } from "./attribute/schema.js";
import { registerNameCapitalCase } from "./name/capital-case.js";
import { registerNameRemovePrefix } from "./name/remove-prefix.js";
import { registerValueMergeValues } from "./value/merge-value.js";
import { registerValueEnsureType } from "./value/ensure-type.js";
import { registerValueCorrectValue } from "./value/correct-value.js";

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
    registerValueCorrectValue(sd),
    registerAttributePlatformNames(sd),
    registerAttributeSchema(sd),
    registerTransformCalciteGroup(sd),
  ]);
}

export { TransformValueCSSShadow } from "./value/css-shadow.js";
export { TransformValueMathSum } from "./value/math-sum.js";
export { TransformValueSizePxToRem } from "./value/px-to-rem.js";
export { TransformValueSizeUnitlessToPx } from "./value/unitless-breakpoint-to-px.js";
export { TransformValueMergeValues } from "./value/merge-value.js";
export { TransformValueEnsureType } from "./value/ensure-type.js";
export { TransformValueCorrectValue } from "./value/correct-value.js";
export { TransformNameRemoveTier } from "./name/remove-tier.js";
export { TransformNameRemoveDefault } from "./name/remove-default.js";
export { TransformNameRemoveColorMode } from "./name/remove-color-mode.js";
export { TransformNameRemovePrefix } from "./name/remove-prefix.js";
export { TransformNameIncludePlusMinus } from "./name/include-plus-minus.js";
export { TransformNameCapitalCase } from "./name/capital-case.js";
export { TransformCalciteGroup, platformTransforms } from "./group/calcite.js";
export { TransformAttributePlatformNames } from "./attribute/platform-names.js";
export { TransformAttributeSchema } from "./attribute/schema.js";
