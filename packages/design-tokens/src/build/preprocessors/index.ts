import { registerPreprocessorStoreSameValueThemeTokens } from "./store-same-value-theme-tokens.ts";
import { registerPreprocessorStorePostMergeDictionary } from "./store-post-merge-dictionary.ts";
import { registerPreprocessorInheritThemeExtensions } from "./inherit-theme-extensions.ts";

export function registerPreprocessors(): void {
  registerPreprocessorInheritThemeExtensions();
  registerPreprocessorStorePostMergeDictionary();
  registerPreprocessorStoreSameValueThemeTokens();
}

export * from "./inherit-theme-extensions.ts";
export * from "./store-same-value-theme-tokens.ts";
export * from "./store-post-merge-dictionary.ts";
