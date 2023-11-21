import { Transform as SdTransform } from "style-dictionary/types/Transform.js";
import { Named as SdNamed } from "style-dictionary/types/_helpers.js";

import { PlatformOptions } from "../../../types/styleDictionary/platform.js";
import { PossibleRegistryArgs } from "../../../types/styleDictionary/registerFunctions.js";
import { TransformedToken } from "../../../types/styleDictionary/transformedToken.js";
import { valueAssetToken } from "./value/valueAssetToken.js";
import { valueAlignFontWeightAndStyles } from "./value/valueAlignFontWeightAndStyle.js";
import { valueStringWrapper } from "./value/valueStringWrapper.js";
import { nameKebabCase } from "./name/nameKebabCase.js";
import { attributePlatformNames } from "./attributes/attributePlatformName.js";
import { nameJoinPath } from "./name/nameJoinPath.js";
import { nameCamelCase } from "./name/nameCamelCase.js";
import { PlatformUnion } from "../../../types/platform.js";
import { valueEvaluateMath } from "./value/valueCheckEvaluateMath.js";
import { CalciteValueRGBA } from "./value/valueRGBA.js";

export type TransformerTypeUnion = `${TransformerTypeEnum}`;

export type TransformerArgs = PlatformOptions;

export type TransformerConfig = SdNamed<SdTransform> &
  Required<Pick<PossibleRegistryArgs, "name" | "transformer" | "type">> &
  Pick<PossibleRegistryArgs, "matcher">;

export type CalledTransformerFunction<R> = typeof calledTransformerFunction<R>;

export const globalTransformations = [
  "ts/size/px",
  "ts/color/modifiers",
  valueAlignFontWeightAndStyles,
  valueEvaluateMath,
  CalciteValueRGBA,
];

export const styles = [
  ...globalTransformations,
  "ts/descriptionToComment",
  "ts/opacity",
  // This transformer name comes from Token Studio transformers
  // eslint-disable-next-line @cspell/spellchecker
  "ts/size/lineheight",
  // This transformer name comes from Token Studio transformers
  // eslint-disable-next-line @cspell/spellchecker
  "ts/size/css/letterspacing",
  // This transformer name comes from Token Studio transformers
  // eslint-disable-next-line @cspell/spellchecker
  "ts/color/css/hexrgba",
  "ts/shadow/css/shorthand",
  valueAssetToken,
  valueStringWrapper,
  nameKebabCase,
];

export const js = [...globalTransformations, attributePlatformNames, nameJoinPath];
export const es6 = [...globalTransformations, "ts/descriptionToComment", "attribute/cti", "color/hex", nameCamelCase];

export const transformations: Record<PlatformUnion, string[]> = {
  css: styles,
  sass: styles,
  scss: styles,
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
  }
): R;
