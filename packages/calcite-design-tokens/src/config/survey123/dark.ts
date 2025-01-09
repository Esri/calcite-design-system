import { logBrokenReferenceLevels, logWarningLevels, logVerbosityLevels } from "style-dictionary/enums";
import { formats } from "style-dictionary/enums";
import { expandTypesMap } from "@tokens-studio/sd-transforms";
import { HeaderCalciteDefault } from "../../../support/header/calcite-default.js";
import { CalciteTransformGroup } from "../../../support/transforms/group/calcite.js";
import * as filter from "../../../support/filter/index.js";
import { Config } from "style-dictionary/types";

const sdTypes = expandTypesMap;

export default {
  // configuration
  source: ["src/semantic/color/survey123/dark.json"],
  include: ["src/core/*.json"],
  preprocessors: ["tokens-studio"],
  platforms: {
    scss: {
      transformGroup: CalciteTransformGroup,
      buildPath: "dist/scss/survey123/",
      prefix: "calcite",
      files: [
        {
          destination: "dark.scss",
          format: formats.scssVariables,
          filter: filter.FilterSurvey123Tokens,
        },
      ],
      options: {
        fileExtension: ".scss",
        fileHeader: HeaderCalciteDefault,
      },
    },
    css: {
      transformGroup: CalciteTransformGroup,
      buildPath: "dist/css/survey123/",
      prefix: "calcite",
      files: [
        {
          destination: "dark.css",
          format: formats.cssVariables,
          filter: filter.FilterSurvey123Tokens,
        },
      ],
      options: {
        fileExtension: ".css",
        fileHeader: HeaderCalciteDefault,
      },
    },
  },
  log: {
    warnings: logWarningLevels.warn,
    verbosity: logVerbosityLevels.verbose,
    errors: {
      brokenReferences: logBrokenReferenceLevels.throw,
    },
  },
  expand: {
    typesMap: sdTypes,
  },
} as Config;
