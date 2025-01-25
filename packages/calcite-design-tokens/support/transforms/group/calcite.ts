import { TransformOptions } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";
import { ValueCSSShadow } from "../value/cssShadow.js";
import { ValueSizePxToRem } from "../value/pxToRem.js";
import { transforms } from "style-dictionary/enums";
import { nameRemoveTier } from "../name/removeTier.js";
import { NameRemoveDefault } from "../name/removeDefault.js";
import { nameRemoveColorMode } from "../name/removeColorMode.js";
import { NameIncludePlusMinus } from "../name/includePlusMinus.js";
import { ValueSizeUnitlessToPx } from "../value/unitlessBreakpointToPx.js";
import { ValueMathSum } from "../value/mathSum.js";

export const platformTransforms = {
  css: [
    "ts/color/css/hexrgba",
    "ts/size/css/letterspacing",
    ValueCSSShadow,
    transforms.nameKebab,
    nameRemoveTier,
    NameRemoveDefault,
    nameRemoveColorMode,
    NameIncludePlusMinus,
  ],
  es6: [transforms.nameCamel, nameRemoveTier, NameRemoveDefault, nameRemoveColorMode, NameIncludePlusMinus],
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
    ValueSizePxToRem,
    ValueSizeUnitlessToPx,
    ValueMathSum,
  ];

  const platform = transformOpts?.platform ?? "css";

  return [...agnosticTransforms, ...(platformTransforms[platform] ?? [])];
}

export const CalciteTransformGroup = "calcite";

export async function registerCalciteTransformGroup(
  sd: typeof StyleDictionary,
  transformOpts?: TransformOptions,
): Promise<void> {
  const includeBuiltinGroup = transformOpts?.withSDBuiltins ?? true;
  const builtinTransforms = sd.hooks.transformGroups[transformOpts?.platform ?? "css"];

  sd.registerTransformGroup({
    name: CalciteTransformGroup,
    transforms: [...(includeBuiltinGroup ? builtinTransforms : []), ...getTransforms(sd, transformOpts)],
  });
}
