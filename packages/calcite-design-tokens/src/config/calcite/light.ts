import { logBrokenReferenceLevels, logWarningLevels, logVerbosityLevels } from "style-dictionary/enums";
import { formats } from "style-dictionary/enums";
import { expandTypesMap } from "@tokens-studio/sd-transforms";
import { HeaderCalciteDefault } from "../../../support/header/calcite-default.js";
import { CalciteTransformGroup, platformTransforms } from "../../../support/transforms/group/calcite.js";
import * as filter from "../../../support/filter/index.js";
import { Config } from "style-dictionary/types";

const sdTypes = expandTypesMap;

export default {
  // configuration
  source: ["src/semantic/color/calcite/light.json"],
  include: ["src/core/*.json"],
  preprocessors: ["tokens-studio"],
  platforms: {
    scss: {
      transformGroup: CalciteTransformGroup,
      buildPath: "dist/scss/",
      prefix: "calcite",
      files: [
        {
          destination: "light.scss",
          format: formats.scssVariables,
          filter: filter.FilterCalciteTokens,
        },
      ],
      options: {
        fileExtension: ".scss",
        fileHeader: HeaderCalciteDefault,
      },
    },
    css: {
      transformGroup: CalciteTransformGroup,
      buildPath: "dist/css/",
      prefix: "calcite",
      files: [
        {
          destination: "light.css",
          format: formats.cssVariables,
          filter: filter.FilterCalciteTokens,
        },
      ],
      options: {
        fileExtension: ".css",
        fileHeader: HeaderCalciteDefault,
      },
    },
    es6: {
      transformGroup: CalciteTransformGroup,
      transforms: platformTransforms.es6,
      buildPath: "dist/es6/",
      prefix: "calcite",
      options: {
        fileExtension: ".ts",
        fileHeader: HeaderCalciteDefault,
      },
      files: [
        {
          destination: "light.ts",
          format: formats.javascriptEs6,
          filter: filter.FilterCalciteTokens,
        },
      ],
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
