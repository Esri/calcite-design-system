import {
  formats as sdFormats,
  logBrokenReferenceLevels,
  logWarningLevels,
  logVerbosityLevels,
} from "style-dictionary/enums";
import { Config } from "style-dictionary/types";
import { expandTypesMap as sdTypes } from "@tokens-studio/sd-transforms";
import { transformers, filters, headers, formats } from "../../../support/index.js";

const config: Config = {
  source: ["src/semantic/calcite/dark.json"],
  include: ["src/core/*.json"],
  preprocessors: ["tokens-studio"],
  platforms: {
    scss: {
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
          destination: "dark.css",
          format: sdFormats.cssVariables,
          filter: filters.FilterSourceTokens,
        },
      ],
      options: {
        fileExtension: ".css",
        fileHeader: headers.HeaderDefault,
      },
    },
    ts: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: transformers.platformTransforms.es6,
      buildPath: "dist/es6/",
      prefix: "calcite",
      options: {
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
          destination: "global.js",
          format: formats.FormatESS6Merge,
          filter: filters.FilterSourceTokens,
          options: {
            suffix: "Dark",
          },
        },

        // d.ts
        {
          destination: "dark.d.ts",
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
        fileExtension: ".json",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "dark.json",
          format: formats.FormatCalciteDocs,
          filter: filters.FilterSourceTokens,
        },
        // {
        //   destination: "global.json",
        //   format: formats.FormatJSONMerge,
        //   filter: filters.FilterSourceTokens,
        //   options: {
        //     suffix: "Dark",
        //   },
        // },
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
