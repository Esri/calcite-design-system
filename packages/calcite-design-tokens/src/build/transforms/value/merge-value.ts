import type { Dictionary, TransformedToken, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../../types/interfaces.js";
import { dark, light } from "../../dictionaries/index.js";
import { isLightOrDarkColorToken } from "../../filter/light-or-dark.js";

let dictionaries: {
  light: Dictionary;
  dark: Dictionary;
};

const transformValueMergeValues: ValueTransform["transform"] = async (token, config) => {
  const { options } = config;

  if (!options?.platform) {
    throw new Error("options.platform is required to merge values");
  }

  if (!dictionaries) {
    const [darkDictionary, lightDictionary] = await Promise.all([
      dark.getPlatformTokens(options.platform, { cache: true }),
      light.getPlatformTokens(options.platform, { cache: true }),
    ]);

    dictionaries = { dark: darkDictionary, light: lightDictionary };
  }

  // we assume both theme dictionaries have the same tokens and in the same order
  const tokenIndex = dictionaries.light.allTokens.findIndex(
    (t: TransformedToken) => t.path.join("/") === token.path.join("/"),
  );

  if (tokenIndex > -1) {
    const lightValue = dictionaries.light.allTokens[tokenIndex].value;
    const darkValue = dictionaries.dark.allTokens[tokenIndex].value;

    if (lightValue !== darkValue) {
      return {
        light: lightValue,
        dark: darkValue,
      };
    }
  }

  return token.value;
};

export const registerValueMergeValues: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformValueMergeValues,
    type: "value",
    transitive: true,
    filter: isLightOrDarkColorToken,
    transform: transformValueMergeValues,
  });
};

export const TransformValueMergeValues = "calcite/transform/value/merge-value";
