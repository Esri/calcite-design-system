import { DesignToken, PreprocessedTokens } from "style-dictionary/types";

type State = {
  postMergeDictionary: PreprocessedTokens;
  sameValueThemeTokens: Map<string, DesignToken>;
};

const sharedBuildState = {
  // populated by preprocessors
} as unknown as State;

export { sharedBuildState as state };
