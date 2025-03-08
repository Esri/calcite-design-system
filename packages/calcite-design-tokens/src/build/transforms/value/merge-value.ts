import { TransformedToken, ValueTransform } from "style-dictionary/types";
import { RegisterFn } from "../../types/interfaces.js";
import { dark, light } from "../../dictionaries/index.js";
import { filterLightOrDarkColorTokens } from "../../filter/light-or-dark.js";

let dictionaries: any;

const transformValueMergeValues: ValueTransform["transform"] = async (token, config) => {
  const { options } = config;

  if (!dictionaries) {
    const darkDictionary = await dark.getPlatformTokens(options.platform, { cache: true });
    const lightDictionary = await light.getPlatformTokens(options.platform, { cache: true });

    dictionaries = { dark: darkDictionary, light: lightDictionary };
  }

  // we assume both theme dictionaries have the same tokens and in the same order
  const tokenIndex = dictionaries.light.allTokens.findIndex(
    (t: TransformedToken) => t.path.join("/") === token.path.join("/"),
  );

  if (tokenIndex > -1) {
    return {
      dark: dictionaries.dark.allTokens[tokenIndex].value,
      light: dictionaries.light.allTokens[tokenIndex].value,
    };
  }

  return token.value;
};

export const registerValueMergeValues: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformValueMergeValues,
    type: "value",
    transitive: true,
    filter: filterLightOrDarkColorTokens,
    transform: transformValueMergeValues,
  });
};

export const TransformValueMergeValues = "calcite/value/mergeValues";
