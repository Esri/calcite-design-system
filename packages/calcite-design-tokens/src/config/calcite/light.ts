import {
  formats as sdFormats,
  logBrokenReferenceLevels,
  logWarningLevels,
  logVerbosityLevels,
} from "style-dictionary/enums";
import { Config } from "style-dictionary/types";
import { expandTypesMap as sdTypes } from "@tokens-studio/sd-transforms";
import { transformers, filters, headers, formats } from "../../build/registry/index.js";

const config: Config = {
  source: ["src/tokens/semantic/calcite/light.json"],
  include: ["src/tokens/core/[!$]*.json"],
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
          filter: filters.FilterSourceTokens,
        },
      ],
      options: {
        platform: "scss",
        fileExtension: ".scss",
        fileHeader: headers.HeaderDefault,
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
          filter: filters.FilterSourceTokens,
        },
      ],
      options: {
        platform: "css",
        fileExtension: ".css",
        fileHeader: headers.HeaderDefault,
      },
    },
    es6: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: transformers.platformTransforms.es6,
      buildPath: "dist/es6/",
      prefix: "calcite",
      options: {
        platform: "es6",
        fileExtension: ".js",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "light.js",
          format: sdFormats.javascriptEs6,
          filter: filters.FilterSourceTokens,
        },

        // d.ts
        {
          destination: "light.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterSourceTokens,
        },
      ],
    },
    js: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: transformers.platformTransforms.es6,
      buildPath: "dist/js/",
      prefix: "calcite",
      options: {
        platform: "js",
        fileExtension: ".js",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "light.js",
          format: formats.FormatCalciteJs,
          filter: filters.FilterSourceTokens,
        },
        // d.ts
        {
          destination: "light.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterSourceTokens,
        },
      ],
    },
    docs: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: [transformers.TransformNameRemovePrefix, transformers.TransformNameCapitalCase],
      buildPath: "dist/docs/",
      prefix: "calcite",
      options: {
        platform: "docs",
        fileExtension: ".json",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "light.json",
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
