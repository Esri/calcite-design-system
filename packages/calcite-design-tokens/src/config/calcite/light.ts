import {
  formats as sdFormats,
  logBrokenReferenceLevels,
  logWarningLevels,
  logVerbosityLevels,
} from "style-dictionary/enums";
import { Config } from "style-dictionary/types";
import { expandTypesMap as sdTypes } from "@tokens-studio/sd-transforms";
import { transformers, filters, headers, formats } from "../../../support/index.js";

export default {
  // configuration
  source: ["src/semantic/calcite/light.json"],
  include: ["src/core/*.json"],
  preprocessors: ["tokens-studio"],
  platforms: {
    scss: {
      transformGroup: transformers.TransformCalciteGroup,
      buildPath: "dist/scss/",
      prefix: "calcite",
      files: [
        {
          destination: "light.scss",
          format: sdFormats.scssVariables,
          filter: filters.FilterCalciteTokens,
        },
      ],
      options: {
        fileExtension: ".scss",
        fileHeader: headers.HeaderCalciteDefault,
      },
    },
    css: {
      transformGroup: transformers.TransformCalciteGroup,
      buildPath: "dist/css/",
      prefix: "calcite",
      files: [
        {
          destination: "light.css",
          format: sdFormats.cssVariables,
          filter: filters.FilterCalciteTokens,
        },
      ],
      options: {
        fileExtension: ".css",
        fileHeader: headers.HeaderCalciteDefault,
      },
    },
    es6: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: transformers.platformTransforms.es6,
      buildPath: "dist/es6/",
      prefix: "calcite",
      options: {
        fileExtension: ".js",
        fileHeader: headers.HeaderCalciteDefault,
      },
      files: [
        {
          destination: "light.js",
          format: sdFormats.javascriptEs6,
          filter: filters.FilterCalciteTokens,
        },
        {
          destination: "global.js",
          format: formats.FormatESS6Merge,
          filter: filters.FilterCalciteTokens,
          options: {
            suffix: "Light",
          },
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
