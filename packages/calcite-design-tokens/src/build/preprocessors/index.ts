import { registerPreprocessorStorePostMergeDictionary } from "./store-post-merge-dictionary.js";

export async function registerPreprocessors(): Promise<void> {
  registerPreprocessorStorePostMergeDictionary();
}

export * from "./store-post-merge-dictionary.js";
