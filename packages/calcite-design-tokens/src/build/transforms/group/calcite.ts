import { transforms } from "style-dictionary/enums";
import StyleDictionary from "style-dictionary";
import { TransformValueSizePxToRem } from "../value/px-to-rem.js";
import { TransformNameRemoveTier } from "../name/remove-tier.js";
import { TransformNameRemoveDefault } from "../name/remove-default.js";
import { TransformNameIncludePlusMinus } from "../name/include-plus-minus.js";
import { TransformAttributePlatformNames } from "../attribute/platform-names.js";
import { TransformAttributeSchema } from "../attribute/schema.js";
import { RegisterFn } from "../../../types/interfaces.js";
import { TransformValueEnsureType } from "../value/ensure-type.js";
import { TransformValueCorrectPreprocessValue } from "../value/correct-pretransform-value.js";
import { Platform } from "../../utils/enums.js";
import { TransformValueCorrectPostprocessValue } from "../value/correct-posttransform-value.js";

export const platformTransforms = {
  [Platform.css]: [
    TransformNameRemoveTier,
    TransformNameRemoveDefault,
    TransformNameIncludePlusMinus,
    TransformAttributePlatformNames,
    TransformAttributeSchema,
    "ts/color/css/hexrgba",
    "shadow/css/shorthand",
  ],
  [Platform.es6]: [
    transforms.nameCamel,
    TransformNameRemoveTier,
    TransformNameRemoveDefault,
    TransformNameIncludePlusMinus,
  ],
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

  return [...agnosticTransforms, ...platformTransforms[Platform.css]];
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
