import StyleDictionary from "style-dictionary";
import { state } from "../shared/state.js";

export function registerPreprocessorStorePostMergeDictionary(sd: typeof StyleDictionary): void {
  sd.registerPreprocessor({
    name: PreprocessorStorePostMergeDictionary,
    preprocessor: (dictionary) => {
      state.originalMergedDictionary = dictionary;
      return dictionary;
    },
  });
}

export const PreprocessorStorePostMergeDictionary = "calcite/preprocessor/store-post-merge-dictionary";
