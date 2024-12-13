import { resolve } from "path";
import StyleDictionary from "style-dictionary";
import { logBrokenReferenceLevels, logWarningLevels, logVerbosityLevels } from "style-dictionary/enums";
import { registerCalciteTransformers } from "./transforms/registerTransforms.js";
import { registerCalciteActions } from "./actions/registerActions.js";
import scss from "../src/config/scss.js";
import { registerCalciteDefaultFileHeader } from "./header/calcite-default.js";
import { __dirname } from "./utils/node.js";
import { registerFilterLightColorTokens } from "./filter/light.js";
import { registerFilterDarkColorTokens } from "./filter/dark.js";

const sd = new StyleDictionary({
  // configuration
  source: [resolve(__dirname, "../src/semantic/*.json")],
  include: [resolve(__dirname, "../src/core/*.json")],
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
    include: ["color", "boxShadow"],
    typesMap: {
      color: "color",
      boxShadow: "shadow",
      light: "color",
      dark: "color",
      min: "breakpoint",
      max: "breakpoint",
    },
  },
});

await registerFilterLightColorTokens(sd);
await registerFilterDarkColorTokens(sd);
await registerCalciteDefaultFileHeader(sd);
await registerCalciteTransformers(sd);
await registerCalciteActions(sd);
await sd.buildAllPlatforms();
