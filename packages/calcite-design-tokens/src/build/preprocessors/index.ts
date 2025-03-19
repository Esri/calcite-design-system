import StyleDictionary from "style-dictionary";
import { registerPreprocessorStorePostMergeDictionary } from "./store-post-merge-dictionary.js";

export async function registerPreprocessors(sd: typeof StyleDictionary): Promise<void> {
  registerPreprocessorStorePostMergeDictionary(sd);
}

export * from "./store-post-merge-dictionary.js";
