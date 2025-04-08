import { registerPreprocessorStoreSameValueThemeTokens } from "./store-same-value-theme-tokens.js";
import { registerPreprocessorStorePostMergeDictionary } from "./store-post-merge-dictionary.js";

export function registerPreprocessors(): void {
  registerPreprocessorStorePostMergeDictionary();
  registerPreprocessorStoreSameValueThemeTokens();
}

export * from "./store-same-value-theme-tokens.js";
export * from "./store-post-merge-dictionary.js";
