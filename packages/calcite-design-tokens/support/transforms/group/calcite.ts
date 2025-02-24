import StyleDictionary from "style-dictionary";
import { TransformOptions } from "@tokens-studio/sd-transforms";

import { TransformValueCSSShadow } from "../value/cssShadow.js";
import { TransformValueSizePxToRem } from "../value/pxToRem.js";
import { transforms } from "style-dictionary/enums";
import { TransformNameRemoveTier } from "../name/removeTier.js";
import { TransformNameRemoveDefault } from "../name/removeDefault.js";
import { TransformNameRemoveColorMode } from "../name/removeColorMode.js";
import { TransformNameIncludePlusMinus } from "../name/includePlusMinus.js";
import { TransformValueSizeUnitlessToPx } from "../value/unitlessBreakpointToPx.js";
import { TransformValueMathSum } from "../value/mathSum.js";
import { TransformAttributePlatformNames } from "../attribute/platformNames.js";
import { TransformAttributeCalciteSchema } from "../attribute/calciteSchema.js";

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
    TransformAttributeCalciteSchema,
  ],
  es6: [
    transforms.nameCamel,
    TransformNameRemoveTier,
    TransformNameRemoveDefault,
    TransformNameRemoveColorMode,
    TransformNameIncludePlusMinus,
  ],
  compose: ["ts/typography/compose/shorthand"],
};

export function getTransforms(sd: typeof StyleDictionary, transformOpts?: TransformOptions): string[] {
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

  const platform = transformOpts?.platform ?? "css";

  return [...agnosticTransforms, ...(platformTransforms[platform] ?? [])];
}

export const TransformCalciteGroup = "calcite";

export async function registerTransformCalciteGroup(
  sd: typeof StyleDictionary,
  transformOpts?: TransformOptions,
): Promise<void> {
  const includeBuiltinGroup = transformOpts?.withSDBuiltins ?? true;
  const builtinTransforms = sd.hooks.transformGroups[transformOpts?.platform ?? "css"];

  sd.registerTransformGroup({
    name: TransformCalciteGroup,
    transforms: [...(includeBuiltinGroup ? builtinTransforms : []), ...getTransforms(sd, transformOpts)],
  });
}
