import {
  formats as sdFormats,
  logBrokenReferenceLevels,
  logWarningLevels,
  logVerbosityLevels,
} from "style-dictionary/enums";
import { Config } from "style-dictionary/types";
import { expandTypesMap as sdTypes } from "@tokens-studio/sd-transforms";
import { transformers, filters, headers, formats } from "../build/registry/index.js";
import { isBreakpoint } from "../build/utils/token-types.js";
import { state } from "../build/shared/state.js";

const commonExpand = {
  include: ["color"],
  typesMap: {
    light: "color",
    dark: "color",
    fontSizes: "fontSize",
    lineHeights: "lineHeight",
    breakpoint: "dimension",
    size: "sizing",
    space: "spacing",
    ...sdTypes,
  },
};

const config: Config = {
  source: ["src/tokens/semantic/[!$]*.json"],
  include: ["src/tokens/core/[!$]*.json", "src/tokens/semantic/calcite/[!$]*.json"],
  preprocessors: ["tokens-studio", "store-merged"],
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
          destination: "light.scss",
          format: sdFormats.scssVariables,
          filter: filters.FilterLightColorTokens,
        },
        {
          destination: "dark.scss",
          format: sdFormats.scssVariables,
          filter: filters.FilterDarkColorTokens,
        },
      ],
      expand: {
        ...commonExpand,
        include: (token) => {
          return token.type === "color" || isBreakpoint(token);
        },
      },
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
          destination: "light.css",
          format: sdFormats.cssVariables,
          filter: filters.FilterLightColorTokens,
        },
        {
          destination: "dark.css",
          format: sdFormats.cssVariables,
          filter: filters.FilterDarkColorTokens,
        },
      ],
      expand: {
        ...commonExpand,
        include: (token) => {
          return token.type === "color" || isBreakpoint(token);
        },
      },
      options: {
        platform: "css",
        fileExtension: ".css",
        fileHeader: headers.HeaderDefault,
      },
    },
    es6: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: [...transformers.platformTransforms.es6 /*, transformers.TransformValueMergeValues*/],
      buildPath: "dist/es6/",
      prefix: "calcite",
      expand: commonExpand,
      options: {
        platform: "es6",
        fileExtension: ".js",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "global.js",
          format: sdFormats.javascriptEs6,
          filter: filters.FilterGlobalTokens,
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
          destination: "core.js",
          format: sdFormats.javascriptEs6,
          filter: filters.FilterCoreTokens,
        },
        {
          destination: "breakpoints.js",
          format: sdFormats.javascriptEs6,
          filter: filters.FilterBreakpointTokens,
        },

        {
          destination: "global.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterGlobalTokens,
          options: {
            fileHeader: headers.HeaderDeprecate,
          },
        },
        {
          destination: "semantic.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterSemanticTokens,
        },
        {
          destination: "core.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterCoreTokens,
        },
        {
          destination: "breakpoints.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterBreakpointTokens,
        },
      ],
    },
    docs: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: [
        transformers.TransformNameRemovePrefix,
        transformers.TransformNameCapitalCase,
        // transformers.TransformValueMergeValues,
      ],
      buildPath: "dist/docs/",
      prefix: "calcite",
      expand: commonExpand,
      options: {
        platform: "docs",
        fileExtension: ".json",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "global.json",
          format: formats.FormatCalciteDocs,
          filter: filters.FilterGlobalTokens,
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
    js: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: [...transformers.platformTransforms.es6 /*transformers.TransformValueMergeValues*/],
      buildPath: "dist/js/",
      prefix: "calcite",
      expand: commonExpand,
      options: {
        platform: "js",
        fileExtension: ".js",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "global.js",
          format: formats.FormatCalciteJs,
          filter: filters.FilterGlobalTokens,
          options: {
            fileHeader: headers.HeaderDeprecate,
          },
        },
        {
          destination: "semantic.js",
          format: formats.FormatCalciteJs,
          filter: filters.FilterSemanticTokens,
        },
        {
          destination: "core.js",
          format: formats.FormatCalciteJs,
          filter: filters.FilterIncludeTokens,
        },

        // d.ts
        {
          destination: "global.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterGlobalTokens,
          options: {
            fileHeader: headers.HeaderDeprecate,
          },
        },
        {
          destination: "semantic.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterSemanticTokens,
        },
        {
          destination: "core.d.ts",
          format: sdFormats.typescriptEs6Declarations,
          filter: filters.FilterIncludeTokens,
        },
      ],
    },
  },
  hooks: {
    preprocessors: {
      "store-merged": (dictionary) => {
        state.originalMergedDictionary = dictionary;
        return dictionary;
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
};

export default config;
