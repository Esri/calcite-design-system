import {
  formats as sdFormats,
  logBrokenReferenceLevels,
  logWarningLevels,
  logVerbosityLevels,
} from "style-dictionary/enums";
import { Config } from "style-dictionary/types";
import { expandTypesMap as sdTypes } from "@tokens-studio/sd-transforms";
import { outputReferencesFilter } from "style-dictionary/utils";
import { transformers, filters, headers, formats } from "../../support/index.js";

const config: Config = {
  source: ["src/semantic/[!$]*.json"],
  include: ["src/core/[!$]*.json"],
  preprocessors: ["tokens-studio"],
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
            fileHeader: headers.HeaderCalciteDeprecate,
          },
        },
        {
          destination: "semantic.scss",
          format: sdFormats.scssVariables,
          filter: filters.FilterGlobalTokens,
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
          options: {
            imports: ["semantic", "breakpoints", "mixins"],
          },
        },
      ],
      options: {
        fileExtension: ".scss",
        fileHeader: headers.HeaderCalciteDefault,
        outputReferences: outputReferencesFilter,
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
            fileHeader: headers.HeaderCalciteDeprecate,
          },
        },
        {
          destination: "semantic.css",
          format: sdFormats.cssVariables,
          filter: filters.FilterGlobalTokens,
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
          options: {
            imports: ["semantic", "classes"],
          },
        },
      ],
      options: {
        fileExtension: ".css",
        fileHeader: headers.HeaderCalciteDefault,
        outputReferences: outputReferencesFilter,
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
          destination: "global.js",
          format: sdFormats.javascriptEs6,
          filter: filters.FilterGlobalTokens,
          options: {
            fileHeader: headers.HeaderCalciteDeprecate,
          },
        },
        {
          destination: "semantic.js",
          format: sdFormats.javascriptEs6,
          filter: filters.FilterGlobalTokens,
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
      ],
    },
    docs: {
      transformGroup: transformers.TransformCalciteGroup,
      transforms: [transformers.TransformNameRemovePrefix, transformers.TransformNameCapitalCase],
      buildPath: "dist/docs/",
      prefix: "calcite",
      options: {
        fileExtension: ".json",
        fileHeader: headers.HeaderCalciteDefault,
      },
      files: [
        {
          destination: "global.json",
          format: formats.FormatCalciteDocs,
          filter: filters.FilterSourceTokens,
        },
        {
          destination: "semantic.json",
          format: formats.FormatCalciteDocs,
          filter: filters.FilterSourceTokens,
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
      // transforms: transformers.platformTransforms.es6,
      buildPath: "dist/js/",
      prefix: "calcite",
      options: {
        fileExtension: ".js",
        fileHeader: headers.HeaderCalciteDefault,
      },
      files: [
        {
          destination: "global.js",
          format: formats.FormatCalciteJs,
          filter: filters.FilterSourceTokens,
          options: {
            fileHeader: headers.HeaderCalciteDeprecate,
          },
        },
        {
          destination: "semantic.js",
          format: formats.FormatCalciteJs,
          filter: filters.FilterSourceTokens,
        },
        {
          destination: "core.js",
          format: formats.FormatCalciteJs,
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
  expand: {
    include: ["color", "breakpoint"],
    typesMap: {
      light: "color",
      dark: "color",
      fontSizes: "fontSize",
      sizing: "dimension",
      size: "dimension",
      space: "dimension",
      spacing: "dimension",
      ...sdTypes,
    },
  },
};

export default config;
