import StyleDictionary from "style-dictionary";
import { Transform } from "style-dictionary/types";
import { alignTypes, excludeParentKeys } from "@tokens-studio/sd-transforms";
import { isBreakpointRelated, isCornerRadius, isFontRelated } from "../utils/token-types.js";

/**
 * This function helps override the behavior of 3rd-party transforms that will help the output match tests.
 *
 * @param sd
 */
export function applyOverrides(sd: typeof StyleDictionary): void {
  applyTokenStudioOverrides(sd);
}

function applyTokenStudioOverrides(sd: typeof StyleDictionary): void {
  overrideTokenStudioPreprocessors(sd);
  overrideTokenStudioTransforms(sd);
}

function overrideTokenStudioPreprocessors(sd: typeof StyleDictionary): void {
  sd.registerPreprocessor({
    name: "tokens-studio",
    preprocessor: (dictionary) => {
      // we override to better match test snapshot
      // see https://github.com/tokens-studio/sd-transforms/blob/main/src/preprocessors/parse-tokens.tss
      // this can be removed once we no longer need to preserve the same output
      const excluded = excludeParentKeys(dictionary);
      const alignedTypes = alignTypes(excluded);
      return alignedTypes;
    },
  });
}

function overrideTokenStudioTransforms(sd: typeof StyleDictionary): void {
  // we override to better match test snapshot
  // this can be removed once we no longer need to preserve the same output
  overrideTransform("ts/size/px", sd, (ogTransform) => ({
    filter: (token, options) => {
      const shouldSkip =
        token.isSource && (isFontRelated(token) || isCornerRadius(token) || isBreakpointRelated(token));
      return !shouldSkip && (!ogTransform.filter || ogTransform.filter(token, options));
    },
  }));

  // we override to better match test snapshot
  // this can be removed once we no longer need to preserve the same output
  overrideTransform("ts/typography/fontWeight", sd, (ogTransform) => ({
    transform: (token, config, options) => {
      const shouldSkip = isFontRelated(token) && token.name.includes("medium-italic");

      if (shouldSkip) {
        const isStylesheet = config.options?.platform === "scss" || config.options?.platform === "css";
        return isStylesheet ? `"${token.value}"` : token.value;
      }

      return ogTransform.transform(token, config, options);
    },
  }));
}

function overrideTransform(
  name: string,
  sd: typeof StyleDictionary,
  getOverride: (
    transform: Omit<Transform, "name">,
  ) => Partial<Omit<Parameters<StyleDictionary["registerTransform"]>[0], "name" | "type">>,
): void {
  const ogTransform = sd.hooks.transforms[name];

  sd.registerTransform({
    ...ogTransform,
    ...getOverride(ogTransform),
    name,
    type: ogTransform.type,
  } as Transform);
}
