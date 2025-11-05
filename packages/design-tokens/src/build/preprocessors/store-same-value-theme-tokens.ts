import StyleDictionary from "style-dictionary";
import type { DesignToken } from "style-dictionary/types";
import { dark, light } from "../dictionaries/index.js";
import { isThemed } from "../utils/token-types.js";
import { state } from "../shared/state.js";

const mergeInclusions = [
  // excluded to match test output – we can remove for a breaking change release
  "{semantic.color.background.none}",
];

export function registerPreprocessorStoreSameValueThemeTokens(): void {
  StyleDictionary.registerPreprocessor({
    name: PreprocessorStoreSameValueThemeTokens,
    preprocessor: async (dictionary) => {
      const keyToToken = new Map<string, DesignToken>();

      light.allTokens.forEach((token, index) => {
        if (
          isThemed(token) &&
          token.value === dark.allTokens[index].value &&
          token.key &&
          mergeInclusions.includes(token.key)
        ) {
          keyToToken.set(token.key, token);
        }
      });

      state.sameValueThemeTokens = keyToToken;

      return dictionary;
    },
  });
}

export const PreprocessorStoreSameValueThemeTokens = "calcite/preprocessor/store-same-value-theme-tokens";
