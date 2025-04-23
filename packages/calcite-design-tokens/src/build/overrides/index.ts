import StyleDictionary from "style-dictionary";
import type { Transform } from "style-dictionary/types";
import { alignTypes, excludeParentKeys } from "@tokens-studio/sd-transforms";
import { PlatformConfig } from "../../types/extensions.js";
import { isBreakpoint, isBreakpointRelated, isFontRelated } from "../utils/token-types.js";
import { Platform } from "../utils/enums.js";

/**
 * This function helps override the behavior of 3rd-party transforms that will help the output match tests.
 *
 * Note: overrides are needed to match test snapshots and can be removed once preserving the same output is no longer necessary
 *
 * @param sd
 */
export function applyOverrides(): void {
  applyTokenStudioOverrides();
}

/**
 * This function helps override the behavior of built-in transforms that will help the output match tests.
 *
 * Note: overrides are needed to match test snapshots and can be removed once preserving the same output is no longer necessary
 *
 * @param sds
 */
export function applyBuiltInOverrides(sds: StyleDictionary[]): void {
  sds.forEach((sd) => {
    overrideTransform("fontFamily/css", sd, (ogTransform) => ({
      transform: (token, config, options) => {
        const { platform } = (config as PlatformConfig).options;
        const isStylesheet = platform === Platform.scss || platform === Platform.css;
        const shouldSkip = !isStylesheet;

        if (shouldSkip) {
          return token.value;
        }

        return ogTransform.transform(token, config, options);
      },
    }));

    overrideTransform("shadow/css/shorthand", sd, (ogTransform) => ({
      transform: (token, config, options) => {
        const { platform } = (config as PlatformConfig).options;
        const isStylesheet = platform === Platform.scss || platform === Platform.css;
        const shouldSkip = !isStylesheet;

        if (shouldSkip) {
          return token.value;
        }

        return ogTransform.transform(token, config, options);
      },
    }));
  });
}

function applyTokenStudioOverrides(): void {
  overrideTokenStudioPreprocessors();
  overrideTokenStudioTransforms();
}

function overrideTokenStudioPreprocessors(): void {
  StyleDictionary.registerPreprocessor({
    name: "tokens-studio",
    preprocessor: (dictionary) => {
      // overrides https://github.com/tokens-studio/sd-transforms/blob/main/src/preprocessors/parse-tokens.tss
      const excluded = excludeParentKeys(dictionary);
      const alignedTypes = alignTypes(excluded);
      return alignedTypes;
    },
  });
}

function overrideTokenStudioTransforms(): void {
  const sd = StyleDictionary;

  overrideTransform("ts/size/px", sd, (ogTransform) => ({
    filter: (token, options) => {
      const shouldSkip = token.isSource && isBreakpointRelated(token);
      return !shouldSkip && (!ogTransform.filter || ogTransform.filter(token, options));
    },
  }));

  overrideTransform("ts/resolveMath", sd, (ogTransform) => ({
    transform: (token, config, options) => {
      if (isBreakpoint(token) && typeof token.value === "object") {
        const ogType = token.type;
        token.type = "border"; // force the transform to process object structure
        const transformed: any = {};
        Object.keys(token.value).forEach(
          (key) =>
            (transformed[key] = ogTransform.transform(
              // fake token transforms each prop and ensures type
              { ...token, value: `${token.value[key]}`, type: "dimension" },
              config,
              options,
            )),
        );
        token.type = ogType;

        return transformed;
      }

      return ogTransform.transform(token, config, options);
    },
  }));

  overrideTransform("ts/typography/fontWeight", sd, (ogTransform) => ({
    transform: (token, config, options) => {
      const shouldSkip = isFontRelated(token) && token.name.includes("medium-italic");

      if (shouldSkip) {
        const { platform } = config.options as PlatformConfig;
        const isStylesheet = platform === Platform.scss || platform === Platform.css;
        return isStylesheet ? `"${token.value}"` : token.value;
      }

      return ogTransform.transform(token, config, options);
    },
  }));
}

function overrideTransform(
  name: string,
  sd: typeof StyleDictionary | StyleDictionary,
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
