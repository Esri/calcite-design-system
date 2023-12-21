import { Transform as SdTransform } from "style-dictionary/types/Transform.js";
import { Named as SdNamed } from "style-dictionary/types/_helpers.js";

import { attributePlatformNames } from "./attributes/attributePlatformName.js";
import { nameCamelCase } from "./name/nameCamelCase.js";
import { nameKebabCase } from "./name/nameKebabCase.js";
import { nameSpacePath } from "./name/nameSpacePath.js";
import { PlatformOptions } from "../../../types/styleDictionary/platform.js";
import { PlatformUnion } from "../../../types/platform.js";
import { PossibleRegistryArgs } from "../../../types/styleDictionary/registerFunctions.js";
import { TransformedToken } from "../../../types/styleDictionary/transformedToken.js";
import { valueAlignFontWeightAndStyles } from "./value/valueAlignFontWeightAndStyle.js";
import { valueAssetToken } from "./value/valueAssetToken.js";
import { valueStringWrapper } from "./value/valueStringWrapper.js";
import { transitiveValueColorCSS } from "./value/valueColorCss.js";
import { transitiveValueEvaluateMath } from "./value/valueCheckEvaluateMath.js";
import { valueFontFamilyFallbacks } from "./value/valueFontFamilyFallbacks.js";
import { CalciteValueToREM } from "./value/valueToREM.js";

export type TransformerTypeUnion = `${TransformerTypeEnum}`;

export type TransformerArgs = PlatformOptions;

export type TransformerConfig = SdNamed<SdTransform> &
  Required<Pick<PossibleRegistryArgs, "name" | "transformer" | "type">> &
  Pick<PossibleRegistryArgs, "matcher">;

export type CalledTransformerFunction<R> = typeof calledTransformerFunction<R>;

export const globalTransformations = [
  "ts/opacity",
  "ts/size/px",
  "ts/color/modifiers",
  valueAlignFontWeightAndStyles,
  transitiveValueColorCSS,
  transitiveValueEvaluateMath,
];

export const styles = [
  ...globalTransformations,
  "ts/descriptionToComment",
  // This transformer name comes from Token Studio transformers
  // eslint-disable-next-line @cspell/spellchecker
  "ts/size/css/letterspacing",
  "ts/shadow/css/shorthand",
  valueAssetToken,
  valueStringWrapper,
  CalciteValueToREM,
  valueFontFamilyFallbacks,
  nameKebabCase,
];

export const js = [...globalTransformations, attributePlatformNames, nameSpacePath];
export const es6 = [...globalTransformations, "ts/descriptionToComment", "attribute/cti", "color/hex", nameCamelCase];

export const transformations: Record<PlatformUnion, string[]> = {
  css: styles,
  sass: styles,
  scss: styles,
  docs: [...globalTransformations, attributePlatformNames, nameSpacePath],
  js,
  es6,
};

export enum TransformerTypeEnum {
  "VALUE" = "value",
  "NAME" = "name",
  "ATTRIBUTE" = "attribute",
}

export declare function calledTransformerFunction<R = any>(
  token: TransformedToken,
  args: {
    [K in keyof TransformerArgs]: TransformerArgs[K];
  },
): R;
