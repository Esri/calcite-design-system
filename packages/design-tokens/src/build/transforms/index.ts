import { registerNameRemoveTier } from "./name/remove-tier.ts";
import { registerNameIncludePlusMinus } from "./name/include-plus-minus.ts";
import { registerValueSizePxToRem } from "./value/px-to-rem.ts";
import { registerNameRemoveDefault } from "./name/remove-default.ts";
import { registerTransformCalciteGroup } from "./group/calcite.ts";
import { registerAttributePlatformNames } from "./attribute/platform-names.ts";
import { registerAttributeSchema } from "./attribute/schema.ts";
import { registerNameCapitalCase } from "./name/capital-case.ts";
import { registerNameRemovePrefix } from "./name/remove-prefix.ts";
import { registerValueMergeValues } from "./value/merge-value.ts";
import { registerValueEnsureType } from "./value/ensure-type.ts";
import { registerValueCorrectPreprocessValue } from "./value/correct-pretransform-value.ts";
import { registerValueCorrectPropName } from "./value/correct-prop-name.ts";
import { registerValueCorrectPostprocessValue } from "./value/correct-posttransform-value.ts";

export function registerTransformers(): void {
  registerValueMergeValues();
  registerNameRemoveTier();
  registerNameRemoveDefault();
  registerNameRemovePrefix();
  registerNameIncludePlusMinus();
  registerNameCapitalCase();
  registerValueSizePxToRem();
  registerValueEnsureType();
  registerValueCorrectPreprocessValue();
  registerValueCorrectPostprocessValue();
  registerValueCorrectPropName();
  registerAttributePlatformNames();
  registerAttributeSchema();
  registerTransformCalciteGroup();
}

export { TransformValueSizePxToRem } from "./value/px-to-rem.ts";
export { TransformValueMergeValues } from "./value/merge-value.ts";
export { TransformValueEnsureType } from "./value/ensure-type.ts";
export { TransformValueCorrectPreprocessValue } from "./value/correct-pretransform-value.ts";
export { TransformValueCorrectPostprocessValue } from "./value/correct-posttransform-value.ts";
export { TransformValueCorrectPropName } from "./value/correct-prop-name.ts";
export { TransformNameRemoveTier } from "./name/remove-tier.ts";
export { TransformNameRemoveDefault } from "./name/remove-default.ts";
export { TransformNameRemovePrefix } from "./name/remove-prefix.ts";
export { TransformNameIncludePlusMinus } from "./name/include-plus-minus.ts";
export { TransformNameCapitalCase } from "./name/capital-case.ts";
export { TransformCalciteGroup, platformTransforms } from "./group/calcite.ts";
export { TransformAttributePlatformNames } from "./attribute/platform-names.ts";
export { TransformAttributeSchema } from "./attribute/schema.ts";
