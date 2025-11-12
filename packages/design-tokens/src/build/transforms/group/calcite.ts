import { transforms } from "style-dictionary/enums";
import StyleDictionary from "style-dictionary";
import { TransformValueSizePxToRem } from "../value/px-to-rem.ts";
import { TransformNameRemoveTier } from "../name/remove-tier.ts";
import { TransformNameRemoveDefault } from "../name/remove-default.ts";
import { TransformNameIncludePlusMinus } from "../name/include-plus-minus.ts";
import { TransformAttributePlatformNames } from "../attribute/platform-names.ts";
import { TransformAttributeSchema } from "../attribute/schema.ts";
import type { Platform, RegisterFn } from "../../../types/interfaces.d.ts";
import { TransformValueEnsureType } from "../value/ensure-type.ts";
import { TransformValueCorrectPreprocessValue } from "../value/correct-pretransform-value.ts";
import { TransformValueCorrectPostprocessValue } from "../value/correct-posttransform-value.ts";

export const platformTransforms: Record<Extract<Platform, "css" | "es6">, string[]> = {
  css: [
    TransformNameRemoveTier,
    TransformNameRemoveDefault,
    TransformNameIncludePlusMinus,
    TransformAttributePlatformNames,
    TransformAttributeSchema,
    "ts/color/css/hexrgba",
    "shadow/css/shorthand",
  ],
  es6: [transforms.nameCamel, TransformNameRemoveTier, TransformNameRemoveDefault, TransformNameIncludePlusMinus],
};

export function getTransforms(): string[] {
  const agnosticTransforms = [
    TransformValueCorrectPreprocessValue,
    "ts/descriptionToComment",
    "ts/resolveMath",
    "ts/size/px",
    "ts/opacity",
    "ts/size/lineheight",
    "ts/typography/fontWeight",
    "ts/color/modifiers",
    TransformValueSizePxToRem,
    TransformValueEnsureType,
    TransformValueCorrectPostprocessValue,
  ];

  return [...agnosticTransforms, ...platformTransforms.css];
}

export const TransformCalciteGroup = "calcite";

export const registerTransformCalciteGroup: RegisterFn = () => {
  const builtinTransforms = StyleDictionary.hooks.transformGroups.css.filter(
    (transform) =>
      // we’ll apply these value transforms separately, since order matters and some may not be relevant
      transform !== "size/rem" && transform !== "shadow/css/shorthand" && transform !== "typography/css/shorthand",
  );

  StyleDictionary.registerTransformGroup({
    name: TransformCalciteGroup,
    transforms: [...builtinTransforms, ...getTransforms()],
  });
};
