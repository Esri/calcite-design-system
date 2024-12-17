import StyleDictionary from "style-dictionary";
import { logBrokenReferenceLevels, logWarningLevels, logVerbosityLevels } from "style-dictionary/enums";
import { registerCalciteTransformers } from "./transforms/registerTransforms.js";
import { registerCalciteActions } from "./actions/registerActions.js";
import scss from "../src/config/scss.js";
import { registerCalciteDefaultFileHeader } from "./header/calcite-default.js";
import { expandTypesMap, register as registerTokenStudioTransformers } from "@tokens-studio/sd-transforms";
import { registerCalciteFilters } from "./filter/registerFilters.js";

await registerTokenStudioTransformers(StyleDictionary);
await registerCalciteFilters(StyleDictionary);
await registerCalciteDefaultFileHeader(StyleDictionary);
await registerCalciteTransformers(StyleDictionary);
await registerCalciteActions(StyleDictionary);

const sd = new StyleDictionary({
  // configuration
  source: ["src/semantic/*.json"],
  include: ["src/core/*.json"],
  preprocessors: ["tokens-studio"],
  platforms: {
    scss,
  },
  log: {
    warnings: logWarningLevels.warn,
    verbosity: logVerbosityLevels.verbose,
    errors: {
      brokenReferences: logBrokenReferenceLevels.throw,
    },
  },
  expand: {
    include: ["color"],
    typesMap: {
      light: "color",
      dark: "color",
      min: "breakpoint",
      max: "breakpoint",
      ...expandTypesMap,
    },
  },
});

await sd.buildAllPlatforms();
