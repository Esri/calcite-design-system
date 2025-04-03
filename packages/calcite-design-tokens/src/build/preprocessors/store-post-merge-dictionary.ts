import StyleDictionary from "style-dictionary";
import { state } from "../shared/state.js";

export function registerPreprocessorStorePostMergeDictionary(): void {
  StyleDictionary.registerPreprocessor({
    name: PreprocessorStorePostMergeDictionary,
    preprocessor: (dictionary) => {
      state.postMergeDictionary = dictionary;
      return dictionary;
    },
  });
}

export const PreprocessorStorePostMergeDictionary = "calcite/preprocessor/store-post-merge-dictionary";
