import { transforms } from "style-dictionary/enums";
import { TransformValueCSSShadow } from "../value/cssShadow.js";
import { TransformValueSizePxToRem } from "../value/pxToRem.js";
import { TransformNameRemoveTier } from "../name/removeTier.js";
import { TransformNameRemoveDefault } from "../name/removeDefault.js";
import { TransformNameRemoveColorMode } from "../name/removeColorMode.js";
import { TransformNameIncludePlusMinus } from "../name/includePlusMinus.js";
import { TransformValueSizeUnitlessToPx } from "../value/unitlessBreakpointToPx.js";
import { TransformValueMathSum } from "../value/mathSum.js";
import { TransformAttributePlatformNames } from "../attribute/platformNames.js";
import { TransformAttributeSchema } from "../attribute/schema.js";
import { RegisterFn } from "../../types/interfaces.js";

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
  ];

  return [...agnosticTransforms, ...platformTransforms["css"]];
}

export const TransformCalciteGroup = "calcite";

export const registerTransformCalciteGroup: RegisterFn = async (sd) => {
  const builtinTransforms = sd.hooks.transformGroups["css"];

  sd.registerTransformGroup({
    name: TransformCalciteGroup,
    transforms: [...builtinTransforms, ...getTransforms()],
  });
};
