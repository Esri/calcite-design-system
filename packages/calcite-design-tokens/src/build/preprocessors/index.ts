import { registerPreprocessorStorePostMergeDictionary } from "./store-post-merge-dictionary.js";

export function registerPreprocessors(): void {
  registerPreprocessorStorePostMergeDictionary();
}

export * from "./store-post-merge-dictionary.js";
