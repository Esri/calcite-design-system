import StyleDictionary from "style-dictionary";
import { Transform } from "style-dictionary/types";
import { isBreakpointRelated, isCornerRadius, isFontRelated } from "../../utils/token-types.js";

/**
 * This function helps override the behavior of 3rd-party transforms that will help the output match tests.
 *
 * @param sd
 */
export function overrideBuiltInTransforms(sd: typeof StyleDictionary): void {
  overrideTransform("ts/size/px", sd, (ogTransform) => {
    return {
      filter: (token, options) => {
        const shouldSkip =
          token.isSource && (isFontRelated(token) || isCornerRadius(token) || isBreakpointRelated(token));
        return !shouldSkip && (!ogTransform.filter || ogTransform.filter(token, options));
      },
    };
  });
}

function overrideTransform(
  name: string,
  sd: typeof StyleDictionary,
  getOverride: (transform: Omit<Transform, "name">) => Partial<Parameters<StyleDictionary["registerTransform"]>[0]>,
): void {
  const ogTransform = sd.hooks.transforms[name];

  sd.hooks.transforms[name] = {
    ...sd.hooks.transforms[name],
    ...getOverride(ogTransform),
  };
}
