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
        fileHeader: headers.HeaderCalciteDefault,
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
      ],
    },
    // js: {
    //   transformGroup: transformers.TransformCalciteGroup,
    //   transforms: transformers.platformTransforms.es6,
    //   buildPath: "dist/js/",
    //   prefix: "calcite",
    //   options: {
    //     fileExtension: ".js",
    //     fileHeader: headers.HeaderCalciteDefault,
    //   },
    //   files: [
    //     {
    //       destination: "dark.js",
    //       format: formats.FormatCalciteDocs,
    //       filter: filters.FilterSourceTokens,
    //     },
    //     {
    //       destination: "global.js",
    //       format: formats.FormatJSONMerge,
    //       filter: filters.FilterSourceTokens,
    //       options: {
    //         suffix: "Dark",
    //       },
    //     },
    //   ],
    // },
    docs: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: transformers.platformTransforms.es6,
      buildPath: "dist/docs/",
      prefix: "calcite",
      options: {
        fileExtension: ".json",
        fileHeader: headers.HeaderCalciteDefault,
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
} as Config;
