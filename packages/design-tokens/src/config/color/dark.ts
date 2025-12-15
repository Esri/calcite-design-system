import {
  formats as sdFormats,
  logBrokenReferenceLevels,
  logWarningLevels,
  logVerbosityLevels,
} from "style-dictionary/enums";
import { expandTypesMap as sdTypes } from "@tokens-studio/sd-transforms";
import type { Config } from "../../types/extensions.d.ts";
import { transformers, filters, headers, formats } from "../../build/registry/index.ts";
import { primitiveValueOutputReferences } from "../../build/utils/output-references.ts";

const config: Config = {
  source: ["src/tokens/semantic/color/dark.json"],
  include: ["src/tokens/semantic/color/dark.json", "src/tokens/core/[!$]*.json"],
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
        platform: "scss",
        fileExtension: ".scss",
        fileHeader: headers.HeaderDefault,
        outputReferences: primitiveValueOutputReferences,
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
        platform: "css",
        fileExtension: ".css",
        fileHeader: headers.HeaderDefault,
        outputReferences: primitiveValueOutputReferences,
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
        outputReferences: primitiveValueOutputReferences,
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
