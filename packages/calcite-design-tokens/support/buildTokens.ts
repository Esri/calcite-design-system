import StyleDictionary from "style-dictionary";
import { logBrokenReferenceLevels, logWarningLevels, logVerbosityLevels } from "style-dictionary/enums";
import { registerCalciteTransformers } from "./transforms/registerTransforms.js";
import scss from "../src/config/scss.js";
import { registerCalciteDefaultFileHeader } from "./header/calcite-default.js";
import { expandTypesMap, register as registerTokenStudioTransformers } from "@tokens-studio/sd-transforms";
import { registerCalciteFilters } from "./filter/registerFilters.js";
import { registerCalciteFormats } from "./format/registerFormats.js";

import css from "../src/config/css.js";

await registerTokenStudioTransformers(StyleDictionary);
await registerCalciteFormats(StyleDictionary);
await registerCalciteFilters(StyleDictionary);
await registerCalciteDefaultFileHeader(StyleDictionary);
await registerCalciteTransformers(StyleDictionary);

const sdTypes = expandTypesMap;
const sd = new StyleDictionary({
  // configuration
  source: ["src/semantic/*.json"],
  include: ["src/core/*.json"],
  preprocessors: ["tokens-studio"],
  platforms: {
    scss,
    css,
  },
  log: {
    warnings: logWarningLevels.warn,
    verbosity: logVerbosityLevels.verbose,
    errors: {
      brokenReferences: logBrokenReferenceLevels.throw,
    },
  },
  expand: {
    include: ["color", "breakpoint"],
    typesMap: {
      light: "color",
      dark: "color",
      min: "breakpoint",
      max: "breakpoint",
      fontSizes: "fontSize",
      sizing: "dimension",
      size: "dimension",
      space: "dimension",
      spacing: "dimension",
      ...sdTypes,
    },
  },
});

await sd.buildAllPlatforms();
