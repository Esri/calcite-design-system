import { Transform as SdTransform } from "style-dictionary/types/Transform";
import { Named as SdNamed } from "style-dictionary/types/_helpers";

import { PlatformOptions } from "../../../types/styleDictionary/platform.js";
import { PossibleRegistryArgs } from "../utils.js";
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

export const globalTransformations = [
  "ts/size/px",
  "ts/color/modifiers",
  valueAlignFontWeightAndStyles,
  valueEvaluateMath,
];

export const styles = [
  ...globalTransformations,
  "ts/descriptionToComment",
  "ts/opacity",
  "ts/size/lineheight",
  // eslint-disable-next-line @cspell/spellchecker
  "ts/size/css/letterspacing",
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

export type TransformerTypeUnion = `${TransformerTypeEnum}`;

// Getting these arguments to have the correct types was what finally made me sit down and extend the StyleDictionary types. It was impossible to debug when I couldn't trust the types I was seeing.
export type TransformerArgs = PlatformOptions;

export type TransformerConfig = SdNamed<SdTransform> &
  Required<Pick<PossibleRegistryArgs, "name" | "transformer" | "type">> &
  Pick<PossibleRegistryArgs, "matcher">;

export declare function calledTransformerFunction<R = any>(
  token: TransformedToken,
  args: {
    [K in keyof TransformerArgs]: TransformerArgs[K];
  }
): R;

export type CalledTransformerFunction<R> = typeof calledTransformerFunction<R>;
