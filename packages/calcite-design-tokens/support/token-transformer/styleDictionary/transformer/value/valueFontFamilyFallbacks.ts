import { Core as StyleDictionary } from "style-dictionary";
import { Matcher } from "style-dictionary/types/Matcher.js";
import { TransformedToken } from "style-dictionary/types/TransformedToken.js";
import { TokenTypes } from "@tokens-studio/types";

import { CalledTransformerFunction, TransformerConfig } from "../utils.js";

export const matcher: Matcher = (token: TransformedToken) => {
  return token.type === TokenTypes.FONT_FAMILIES && Array.isArray(token.value);
};

type FontFamilyFallbackToken = TransformedToken & { value: string[] };

export const transformValuesFontFamilyWithFallbacks: CalledTransformerFunction<string> = (
  token: FontFamilyFallbackToken
) => {
  return token.value.join(" ");
};

export const registerValueFontFamilyWithFallbacks = (sd: StyleDictionary): void => {
  const transformerConfig: TransformerConfig = {
    name: valueFontFamilyFallbacks,
    transformer: transformValuesFontFamilyWithFallbacks,
    type: "value",
    matcher,
    transitive: true,
  };

  sd.registerTransform(transformerConfig);
};

export const valueFontFamilyFallbacks = "value/calcite/font-family";
