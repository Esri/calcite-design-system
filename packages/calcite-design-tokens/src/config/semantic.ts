import {
  formats as sdFormats,
  logBrokenReferenceLevels,
  logWarningLevels,
  logVerbosityLevels,
  transforms,
} from "style-dictionary/enums";
import { Config, OutputReferences } from "style-dictionary/types";
import { expandTypesMap as sdTypes } from "@tokens-studio/sd-transforms";
import { preprocessors, transformers, filters, headers, formats } from "../build/registry/index.js";
import { isBreakpointExpand, isCornerRadius } from "../build/utils/token-types.js";

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

const stylesheetOutputReferences: OutputReferences = (token) => {
  // output specific token references to match test output
  return !!(isCornerRadius(token) && token.path.includes("default"));
};

const config: Config = {
  source: ["src/tokens/semantic/[!$]*.json"],
  include: ["src/tokens/core/[!$]*.json", "src/tokens/semantic/calcite/[!$]*.json"],
  preprocessors: ["tokens-studio", preprocessors.PreprocessorStorePostMergeDictionary],
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
      transforms: [...transformers.platformTransforms.es6, transformers.TransformValueCorrectPropName],
      buildPath: "dist/es6/",
      prefix: "calcite",
      expand: {
        typesMap: commonExpand.typesMap,
        exclude: (token) => {
          return token.type === "color" || token.type !== "string";
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
          filter: filters.FilterBreakpointTokens,
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
        transformers.TransformValueCorrectPropName,
      ],
      buildPath: "dist/docs/",
      prefix: "calcite",
      expand: {
        typesMap: commonExpand.typesMap,
        exclude: (token) => {
          return token.type === "color" || token.type !== "string";
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
    js: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: [
        ...transformers.platformTransforms.es6.filter(
          // conflicts with TransformNameCapitalCase
          (transform) =>
            transform !== transforms.nameCamel &&
            // already handled by group transform
            transform !== transformers.TransformNameIncludePlusMinus,
        ),
        transformers.TransformNameRemovePrefix,
        transformers.TransformNameCapitalCase,
        transformers.TransformValueCorrectPropName,
      ],
      buildPath: "dist/js/",
      prefix: "calcite",
      expand: {
        typesMap: commonExpand.typesMap,
        exclude: (token) => {
          return token.type === "color" || token.type !== "string";
        },
      },
      options: {
        platform: "js",
        fileExtension: ".js",
        fileHeader: headers.HeaderDefault,
      },
      files: [
        {
          destination: "global.js",
          format: formats.FormatCalciteJs,
          filter: filters.FilterGlobalTokensJs,
          options: {
            fileHeader: headers.HeaderDeprecate,
          },
        },
        {
          destination: "global.d.ts",
          format: sdFormats.typescriptModuleDeclarations,
          filter: filters.FilterGlobalTokensJs,
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
          destination: "semantic.d.ts",
          format: sdFormats.typescriptModuleDeclarations,
          filter: filters.FilterSemanticTokens,
        },
        {
          destination: "core.js",
          format: formats.FormatCalciteJs,
          filter: filters.FilterIncludeTokens,
        },
        {
          destination: "core.d.ts",
          format: sdFormats.typescriptModuleDeclarations,
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
