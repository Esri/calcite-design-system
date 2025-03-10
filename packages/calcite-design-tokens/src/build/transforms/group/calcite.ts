import { transforms } from "style-dictionary/enums";
import { TransformValueCSSShadow } from "../value/css-shadow.js";
import { TransformValueSizePxToRem } from "../value/px-to-rem.js";
import { TransformNameRemoveTier } from "../name/remove-tier.js";
import { TransformNameRemoveDefault } from "../name/remove-default.js";
import { TransformNameRemoveColorMode } from "../name/remove-color-mode.js";
import { TransformNameIncludePlusMinus } from "../name/include-plus-minus.js";
import { TransformValueSizeUnitlessToPx } from "../value/unitless-breakpoint-to-px.js";
import { TransformValueMathSum } from "../value/math-sum.js";
import { TransformAttributePlatformNames } from "../attribute/platform-names.js";
import { TransformAttributeSchema } from "../attribute/schema.js";
import { RegisterFn } from "../../types/interfaces.js";
import { TransformValueEnsureType } from "../value/ensure-type.js";
import { TransformValueCorrectValue } from "../value/correct-value.js";

export const platformTransforms = {
  css: [
    "ts/color/css/hexrgba",
    "ts/size/css/letterspacing",
    TransformValueCSSShadow,
    transforms.nameKebab,
    TransformNameRemoveTier,
    TransformNameRemoveDefault,
    TransformNameRemoveColorMode,
    TransformNameIncludePlusMinus,
    TransformAttributePlatformNames,
    TransformAttributeSchema,
  ],
  es6: [
    transforms.nameCamel,
    TransformNameRemoveTier,
    TransformNameRemoveDefault,
    TransformNameRemoveColorMode,
    TransformNameIncludePlusMinus,
  ],
};

export function getTransforms(): string[] {
  const agnosticTransforms = [
    TransformValueCorrectValue,
    "ts/descriptionToComment",
    "ts/resolveMath",
    "ts/size/px",
    "ts/opacity",
    "ts/size/lineheight",
    "ts/typography/fontWeight",
    "ts/color/modifiers",
    TransformValueSizePxToRem,
    TransformValueSizeUnitlessToPx,
    TransformValueMathSum,
    TransformValueEnsureType,
  ];

  return [...agnosticTransforms, ...platformTransforms["css"]];
}

export const TransformCalciteGroup = "calcite";

export const registerTransformCalciteGroup: RegisterFn = async (sd) => {
  const builtinTransforms = sd.hooks.transformGroups["css"].filter(
    (transform) =>
      // we'll apply rem value transforms separately
      !transform.startsWith("size/rem"),
  );

  sd.registerTransformGroup({
    name: TransformCalciteGroup,
    transforms: [...builtinTransforms, ...getTransforms()],
  });
};
