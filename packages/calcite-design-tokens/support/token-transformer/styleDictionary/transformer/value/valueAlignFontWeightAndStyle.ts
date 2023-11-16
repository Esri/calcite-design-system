import { Core as StyleDictionary } from "style-dictionary";
import { Matcher } from "style-dictionary/types/Matcher";
import { TransformedToken } from "style-dictionary/types/TransformedToken";
import { TokenTypes } from "@tokens-studio/types";

import { fontWeightReg } from "../../parser/utils/transformFontWeights.js";
import { CalledTransformerFunction, TransformerConfig } from "../utils.js";
import { FontWeight } from "../../../../types/tokenTypes/fontWeight.js";

export const matcher: Matcher = (token: TransformedToken) => {
  return (
    (token.type === TokenTypes.TYPOGRAPHY || token.type === TokenTypes.FONT_WEIGHTS) && typeof token.value !== "number"
  );
};

// Always convert font weights to numbers for better cross platform compliance
export const transformValuesAlignFontWeightAndStyles: CalledTransformerFunction<
  string | number | Record<string, string>
> = (token) => {
  if (typeof token.value === "string") {
    const isNumber = !isNaN(Number(token.value)) && !isNaN(parseFloat(token.value));
    return isNumber ? Number(token.value) : FontWeight[token.value.toLowerCase()] || `${token.value}`;
  }

  const fontStyleMatch = token.value?.fontWeight.match(fontWeightReg);
  if (fontStyleMatch?.groups?.weight && fontStyleMatch.groups.style) {
    token.value.fontStyle = fontStyleMatch.groups.style.toLowerCase();
    token.value.fontWeight = FontWeight[fontStyleMatch?.groups?.weight.toLowerCase()] || fontStyleMatch?.groups?.weight;
  }

  // eslint-disable-next-line @cspell/spellchecker
  // Roboto Regular Italic might have only: `fontWeight: 'Italic'`
  // which means that the weight is Regular and the style is Italic
  if (token.value.fontStyle.includes(token.value.fontWeight.toLowerCase())) {
    token.value.fontStyle = token.value.fontWeight.toLowerCase();
    token.value.fontWeight = FontWeight["Regular"];
  }
  return token.value;
};

export const registerValueAlignFontWeightAndStyles = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: valueAlignFontWeightAndStyles,
    transformer: transformValuesAlignFontWeightAndStyles,
    type: "value",
    matcher,
  };

  sd.registerTransform(transformerConfig);
};

export const valueAlignFontWeightAndStyles = "value/calcite/font-weight-styles";
