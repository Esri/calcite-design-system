import StyleDictionary from "style-dictionary";
import { Config, PlatformConfig, Transform, TransformedToken, ValueTransform } from "style-dictionary/types";
import { alignTypes, excludeParentKeys } from "@tokens-studio/sd-transforms";
import { isBreakpoint, isBreakpointRelated, isCornerRadius, isFontRelated } from "../utils/token-types.js";

/**
 * This function helps override the behavior of 3rd-party transforms that will help the output match tests.
 *
 * @param sd
 */
export function applyOverrides(sd: typeof StyleDictionary): void {
  applyTokenStudioOverrides(sd);
}

/**
 * This function helps override the behavior of built-in transforms that will help the output match tests.
 *
 * @param sds
 */
export function applyBuiltInOverrides(sds: StyleDictionary[]): void {
  sds.forEach((sd) => {
    overrideTransform("fontFamily/css", sd, (ogTransform) => ({
      transform: (token, config, options) => {
        const isStylesheet = config.options?.platform === "scss" || config.options?.platform === "css";
        const shouldSkip = !isStylesheet;

        if (shouldSkip) {
          return token.value;
        }

        return ogTransform.transform(token, config, options);
      },
    }));

    overrideTransform("shadow/css/shorthand", sd, (ogTransform) => ({
      transform: (token, config, options) => {
        const isStylesheet = config.options?.platform === "scss" || config.options?.platform === "css";
        const shouldSkip = !isStylesheet;

        if (shouldSkip) {
          return token.value;
        }

        return ogTransform.transform(token, config, options);
      },
    }));
  });
}

function applyTokenStudioOverrides(sd: typeof StyleDictionary): void {
  overrideTokenStudioPreprocessors(sd);
  overrideTokenStudioTransforms(sd);
}

function overrideTokenStudioPreprocessors(sd: typeof StyleDictionary): void {
  // we override to better match test snapshot
  // this can be removed once we no longer need to preserve the same output
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
  function transformThemeColor(
    theme: "light" | "dark",
    target: any,
    context: {
      token: TransformedToken;
      transform: ValueTransform;
      config: PlatformConfig;
      options: Config;
    },
  ): void {
    context.token.value.color = context.token.value[theme];
    target[theme] = (
      context.transform.transform(context.token, context.config, context.options) as {
        color: string;
      }
    ).color;
    delete context.token.value.color;
  }

  // we override to better match test snapshot
  // this can be removed once we no longer need to preserve the same output
  overrideTransform("ts/color/css/hexrgba", sd, (ogTransform) => ({
    transform: (token, config, options) => {
      const isLegacyThemeToken = typeof token.value === "object" && "light" in token.value;
      if (isLegacyThemeToken) {
        const ogType = token.type;
        token.type = "shadow"; // force the transform to process object structure
        const transformed = {};
        transformThemeColor("light", transformed, { token, transform: ogTransform as ValueTransform, config, options });
        transformThemeColor("dark", transformed, { token, transform: ogTransform as ValueTransform, config, options });
        token.type = ogType;

        return transformed;
      }

      return ogTransform.transform(token, config, options);
    },
  }));

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
