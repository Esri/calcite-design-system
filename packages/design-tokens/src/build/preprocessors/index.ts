import { registerPreprocessorStoreSameValueThemeTokens } from "./store-same-value-theme-tokens.ts";
import { registerPreprocessorStorePostMergeDictionary } from "./store-post-merge-dictionary.ts";

export function registerPreprocessors(): void {
  registerPreprocessorStorePostMergeDictionary();
  registerPreprocessorStoreSameValueThemeTokens();
}

export * from "./store-same-value-theme-tokens.ts";
export * from "./store-post-merge-dictionary.ts";
