import {
  formats as sdFormats,
  logBrokenReferenceLevels,
  logWarningLevels,
  logVerbosityLevels,
} from "style-dictionary/enums";
import { expandTypesMap as sdTypes } from "@tokens-studio/sd-transforms";
import type { Config } from "../../types/extensions.js";
import { transformers, filters, headers, formats } from "../../build/registry/index.js";
import { Platform } from "../../build/utils/enums.js";

const config: Config = {
  source: ["src/tokens/semantic/color/dark.json"],
  include: ["src/tokens/semantic/color/dark.json", "src/tokens/core/[!$]*.json"],
  preprocessors: ["tokens-studio"],
  platforms: {
    [Platform.scss]: {
      transformGroup: transformers.TransformCalciteGroup,
      buildPath: "dist/scss/",
      prefix: "calcite",
      files: [
        {
          destination: "dark.scss",
          format: sdFormats.scssVariables,
          filter: filters.FilterSourceTokens,
        },
      ],
      options: {
        platform: Platform.scss,
        fileExtension: ".scss",
        fileHeader: headers.HeaderDefault,
      },
    },
    [Platform.css]: {
      transformGroup: transformers.TransformCalciteGroup,
      buildPath: "dist/css/",
      prefix: "calcite",
      files: [
        {
          destination: "dark.css",
          format: sdFormats.cssVariables,
          filter: filters.FilterSourceTokens,
        },
      ],
      options: {
        platform: Platform.css,
        fileExtension: ".css",
        fileHeader: headers.HeaderDefault,
      },
    },
    [Platform.es6]: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: transformers.platformTransforms.es6,
      buildPath: "dist/es6/",
      prefix: "calcite",
      options: {
        platform: Platform.es6,
        fileExtension: ".js",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "dark.js",
          format: sdFormats.javascriptEs6,
          filter: filters.FilterSourceTokens,
        },
        {
          destination: "dark.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterSourceTokens,
        },
      ],
    },
    [Platform.js]: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: transformers.platformTransforms.es6,
      buildPath: "dist/js/",
      prefix: "calcite",
      options: {
        platform: Platform.js,
        fileExtension: ".js",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "dark.js",
          format: formats.FormatCalciteJs,
          filter: filters.FilterSourceTokens,
        },
        {
          destination: "dark.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterSourceTokens,
        },
      ],
    },
    [Platform.docs]: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: [transformers.TransformNameRemovePrefix, transformers.TransformNameCapitalCase],
      buildPath: "dist/docs/",
      prefix: "calcite",
      options: {
        platform: Platform.docs,
        fileExtension: ".json",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "dark.json",
          format: formats.FormatCalciteDocs,
          filter: filters.FilterSourceTokens,
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
};

export default config;
