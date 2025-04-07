import StyleDictionary from "style-dictionary";
import { DesignToken } from "style-dictionary/types";
import { dark, light } from "../dictionaries/index.js";
import { isThemed } from "../utils/token-types.js";
import { state } from "../shared/state.js";

export function registerPreprocessorStoreSameValueThemeTokens(): void {
  StyleDictionary.registerPreprocessor({
    name: PreprocessorStoreSameValueThemeTokens,
    preprocessor: async (dictionary) => {
      const sameValueThemeTokens = light.allTokens
        .filter((token) => isThemed(token))
        .filter((token, index) => token.value === dark.allTokens[index].value);
      const keyToToken = new Map<string, DesignToken>();

      sameValueThemeTokens.forEach((token) => {
        if (token.key) {
          keyToToken.set(token.key, token);
        }
      });

      state.sameValueThemeTokens = keyToToken;

      return dictionary;
    },
  });
}

export const PreprocessorStoreSameValueThemeTokens = "calcite/preprocessor/store-same-value-theme-tokens";
