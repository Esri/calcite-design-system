import { registerNameRemoveTier } from "./name/remove-tier.js";
import { registerNameIncludePlusMinus } from "./name/include-plus-minus.js";
import { registerValueSizePxToRem } from "./value/px-to-rem.js";
import { registerNameRemoveDefault } from "./name/remove-default.js";
import { registerTransformCalciteGroup } from "./group/calcite.js";
import { registerAttributePlatformNames } from "./attribute/platform-names.js";
import { registerAttributeSchema } from "./attribute/schema.js";
import { registerNameCapitalCase } from "./name/capital-case.js";
import { registerNameRemovePrefix } from "./name/remove-prefix.js";
import { registerValueMergeValues } from "./value/merge-value.js";
import { registerValueEnsureType } from "./value/ensure-type.js";
import { registerValueCorrectPreprocessValue } from "./value/correct-pretransform-value.js";
import { registerValueCorrectPropName } from "./value/correct-prop-name.js";
import { registerValueCorrectPostprocessValue } from "./value/correct-posttransform-value.js";

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

export { TransformValueSizePxToRem } from "./value/px-to-rem.js";
export { TransformValueMergeValues } from "./value/merge-value.js";
export { TransformValueEnsureType } from "./value/ensure-type.js";
export { TransformValueCorrectPreprocessValue } from "./value/correct-pretransform-value.js";
export { TransformValueCorrectPostprocessValue } from "./value/correct-posttransform-value.js";
export { TransformValueCorrectPropName } from "./value/correct-prop-name.js";
export { TransformNameRemoveTier } from "./name/remove-tier.js";
export { TransformNameRemoveDefault } from "./name/remove-default.js";
export { TransformNameRemovePrefix } from "./name/remove-prefix.js";
export { TransformNameIncludePlusMinus } from "./name/include-plus-minus.js";
export { TransformNameCapitalCase } from "./name/capital-case.js";
export { TransformCalciteGroup, platformTransforms } from "./group/calcite.js";
export { TransformAttributePlatformNames } from "./attribute/platform-names.js";
export { TransformAttributeSchema } from "./attribute/schema.js";
