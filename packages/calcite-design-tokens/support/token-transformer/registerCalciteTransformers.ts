import { Core as StyleDictionary } from "style-dictionary";
import { registerTransforms } from "@tokens-studio/sd-transforms";

import { registerAttributePlatformNames } from "./styleDictionary/transformer/attributes/attributePlatformName.js";
import { registerCustomJSONParser } from "./styleDictionary/parser/calcite/index.js";
import { registerFilterSource } from "./styleDictionary/filter/filterSource.js";
import { registerFormatterCss } from "./styleDictionary/formatter/css.js";
import { registerFormatterScss } from "./styleDictionary/formatter/scss.js";
import { registerFormatterJs } from "./styleDictionary/formatter/javascript.js";
import { registerNameCamelCase } from "./styleDictionary/transformer/name/nameCamelCase.js";
import { registerNameJoinPath } from "./styleDictionary/transformer/name/nameJoinPath.js";
import { registerNameKebabCase } from "./styleDictionary/transformer/name/nameKebabCase.js";
import { registerValueAlignFontWeightAndStyles } from "./styleDictionary/transformer/value/valueAlignFontWeightAndStyle.js";
import { registerValueAssetToken } from "./styleDictionary/transformer/value/valueAssetToken.js";
import { registerValueStringWrapper } from "./styleDictionary/transformer/value/valueStringWrapper.js";
import { registerValueEvaluateMath } from "./styleDictionary/transformer/value/valueCheckEvaluateMath.js";
import { registerNameSpacePath } from "./styleDictionary/transformer/name/nameSpacePath.js";
import { registerFormatterDocs } from "./styleDictionary/formatter/docs.js";
import { registerValueToREM } from "./styleDictionary/transformer/value/valueToREM.js";
import { registerValueFontFamilyWithFallbacks } from "./styleDictionary/transformer/value/valueFontFamilyFallbacks.js";
import { registerValueColorCSS } from "./styleDictionary/transformer/value/valueColorCss.js";
import { registerValueLineHeight } from "./styleDictionary/transformer/value/valueLineHeight.js";

export async function registerCalciteTransformers(sd: StyleDictionary): Promise<void> {
  // Here we are registering the Transforms provided by Token Studio however,
  // we need to pass "expand: false" so that we can use our own custom JSON file parser.
  // any references to "ts/..." below are references to these Token Studio transformers
  // https://github.com/tokens-studio/sd-transforms
  await registerTransforms(sd, {
    expand: false,
  });
  registerValueEvaluateMath(sd);
  registerAttributePlatformNames(sd);
  registerCustomJSONParser(sd);
  registerFilterSource(sd);
  registerFormatterCss(sd);
  registerFormatterDocs(sd);
  registerFormatterJs(sd);
  registerFormatterScss(sd);
  registerNameCamelCase(sd);
  registerNameJoinPath(sd);
  registerNameKebabCase(sd);
  registerNameSpacePath(sd);
  registerValueAlignFontWeightAndStyles(sd);
  registerValueAssetToken(sd);
  registerValueEvaluateMath(sd);
  registerValueFontFamilyWithFallbacks(sd);
  registerValueStringWrapper(sd);
  registerValueToREM(sd);
  registerValueColorCSS(sd);
  registerValueLineHeight(sd);
}
