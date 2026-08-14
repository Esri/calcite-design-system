import {
  formats as sdFormats,
  logBrokenReferenceLevels,
  logWarningLevels,
  logVerbosityLevels,
} from "style-dictionary/enums";
import { expandTypesMap as sdTypes } from "@tokens-studio/sd-transforms";
import type { Config } from "../types.ts";
import { preprocessors, transformers, filters, headers, formats } from "../build/registry/index.ts";
import { isBreakpointExpand } from "../build/utils/token-types.ts";
import { stylesheetOutputReferences } from "../build/utils/output-references.ts";

const commonExpand = {
  typesMap: {
    ...sdTypes,
  },
};

const config: Config = {
  source: ["src/tokens/semantic/[!$]*.json"],
  include: ["src/tokens/core/[!$]*.json", "src/tokens/semantic/color/[!$]*.json"],
  preprocessors: [
    "tokens-studio",
    preprocessors.PreprocessorStorePostMergeDictionary,
    preprocessors.PreprocessorStoreSameValueThemeTokens,
  ],
  platforms: {
    scss: {
      transformGroup: transformers.TransformCalciteGroup,
      buildPath: "dist/scss/",
      prefix: "calcite",
      files: [
        {
          destination: "global.scss",
          format: sdFormats.scssVariables,
          filter: filters.FilterGlobalTokens,
          options: {
            fileHeader: headers.HeaderDeprecate,
          },
        },
        {
          destination: "semantic.scss",
          format: sdFormats.scssVariables,
          filter: filters.FilterSemanticTokens,
        },
        {
          destination: "core.scss",
          format: sdFormats.scssVariables,
          filter: filters.FilterCoreTokens,
        },
        {
          destination: "breakpoints.scss",
          format: sdFormats.scssVariables,
          filter: filters.FilterBreakpointTokens,
        },
        {
          destination: "mixins.scss",
          format: formats.FormatTypography,
          filter: filters.FilterTypographyTokens,
        },
        {
          destination: "index.scss",
          format: formats.FormatIndex,
          filter: filters.FilterLightOrDarkColorTokens,
          options: {
            imports: ["semantic", "breakpoints", "mixins"],
          },
        },
        {
          destination: "light-dark.scss",
          format: formats.FormatLightDark,
          filter: filters.FilterLightOrDarkColorTokens,
        },
        {
          destination: "index-light-dark.scss",
          format: formats.FormatIndexLightDark,
          filter: filters.FilterLightOrDarkColorTokens,
          options: {
            imports: ["semantic", "breakpoints", "mixins"],
          },
        },
      ],
      expand: {
        ...commonExpand,
        include: (token) => {
          return token.type === "color" || isBreakpointExpand(token);
        },
      },
      options: {
        platform: "scss",
        fileExtension: ".scss",
        fileHeader: headers.HeaderDefault,
        outputReferences: stylesheetOutputReferences,
      },
    },
    css: {
      transformGroup: transformers.TransformCalciteGroup,
      buildPath: "dist/css/",
      prefix: "calcite",
      files: [
        {
          destination: "global.css",
          format: sdFormats.cssVariables,
          filter: filters.FilterGlobalTokens,
          options: {
            fileHeader: headers.HeaderDeprecate,
          },
        },
        {
          destination: "semantic.css",
          format: sdFormats.cssVariables,
          filter: filters.FilterSemanticTokens,
        },
        {
          destination: "core.css",
          format: sdFormats.cssVariables,
          filter: filters.FilterCoreTokens,
        },
        {
          destination: "breakpoints.css",
          format: sdFormats.cssVariables,
          filter: filters.FilterBreakpointTokens,
        },
        {
          destination: "classes.css",
          format: formats.FormatTypography,
          filter: filters.FilterTypographyTokens,
        },
        {
          destination: "index.css",
          format: formats.FormatIndex,
          filter: filters.FilterLightOrDarkColorTokens,
          options: {
            imports: ["semantic", "classes"],
          },
        },
        {
          destination: "light-dark.css",
          format: formats.FormatLightDark,
          filter: filters.FilterLightOrDarkColorTokens,
        },
        {
          destination: "index-light-dark.css",
          format: formats.FormatIndexLightDark,
          filter: filters.FilterLightOrDarkColorTokens,
          options: {
            imports: ["semantic", "classes"],
          },
        },
      ],
      expand: {
        ...commonExpand,
        include: (token) => {
          return token.type === "color" || isBreakpointExpand(token);
        },
      },
      options: {
        platform: "css",
        fileExtension: ".css",
        fileHeader: headers.HeaderDefault,
        outputReferences: stylesheetOutputReferences,
      },
    },
    es6: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: [
        ...transformers.platformTransforms.es6,
        transformers.TransformValueCorrectPropName,
        transformers.TransformValueMergeValues,
        transformers.TransformValueEs6MergeBreakpoints,
      ],
      buildPath: "dist/es6/",
      prefix: "calcite",
      expand: {
        typesMap: commonExpand.typesMap,
        include: (token) => {
          return token.type === "color";
        },
      },
      options: {
        platform: "es6",
        fileExtension: ".js",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "global.js",
          format: sdFormats.javascriptEs6,
          filter: filters.FilterGlobalTokensJs,
          options: {
            fileHeader: headers.HeaderDeprecate,
          },
        },
        {
          destination: "global.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterGlobalTokensJs,
          options: {
            fileHeader: headers.HeaderDeprecate,
          },
        },
        {
          destination: "semantic.js",
          format: sdFormats.javascriptEs6,
          filter: filters.FilterSemanticTokens,
        },
        {
          destination: "semantic.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterSemanticTokens,
        },
        {
          destination: "core.js",
          format: sdFormats.javascriptEs6,
          filter: filters.FilterCoreTokens,
        },
        {
          destination: "core.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterCoreTokens,
        },
        {
          destination: "breakpoints.js",
          format: sdFormats.javascriptEs6,
          filter: filters.FilterEs6BreakpointTokens,
        },
        {
          destination: "breakpoints.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterEs6BreakpointTokens,
        },
      ],
    },
    docs: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: [
        transformers.TransformNameRemovePrefix,
        transformers.TransformNameCapitalCase,
        transformers.TransformValueCorrectPropName,
        transformers.TransformValueMergeValues,
      ],
      buildPath: "dist/docs/",
      prefix: "calcite",
      expand: {
        typesMap: commonExpand.typesMap,
        include: (token) => {
          return token.type === "color";
        },
      },
      options: {
        platform: "docs",
        fileExtension: ".json",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "global.json",
          format: formats.FormatCalciteDocs,
          filter: filters.FilterGlobalTokensJs,
        },
        {
          destination: "semantic.json",
          format: formats.FormatCalciteDocs,
          filter: filters.FilterSemanticTokens,
        },
        {
          destination: "core.json",
          format: formats.FormatCalciteDocs,
          filter: filters.FilterIncludeTokens,
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
};

export default config;
