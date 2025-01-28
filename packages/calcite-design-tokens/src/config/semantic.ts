import { logBrokenReferenceLevels, logWarningLevels, logVerbosityLevels } from "style-dictionary/enums";
import { formats } from "style-dictionary/enums";
import { expandTypesMap } from "@tokens-studio/sd-transforms";
import { HeaderCalciteDefault } from "../../support/header/calcite-default.js";
import { CalciteTransformGroup, platformTransforms } from "../../support/transforms/group/calcite.js";
import * as filter from "../../support/filter/index.js";
import { Config } from "style-dictionary/types";
import { FormatCalciteDocs } from "../../support/format/docs.js";
import { HeaderCalciteDeprecate } from "../../support/header/calcite-deprecate.js";
import { FormatCalciteJs } from "../../support/format/javascript.js";

const sdTypes = expandTypesMap;

export default {
  // configuration
  source: ["src/semantic/*.json"],
  include: ["src/core/*.json"],
  preprocessors: ["tokens-studio"],
  platforms: {
    scss: {
      transformGroup: CalciteTransformGroup,
      buildPath: "dist/scss/",
      prefix: "calcite",
      files: [
        {
          destination: "global.scss",
          format: formats.scssVariables,
          filter: filter.FilterGlobalTokens,
          options: {
            fileHeader: HeaderCalciteDeprecate,
          },
        },
        {
          destination: "semantic.scss",
          format: formats.scssVariables,
          filter: filter.FilterGlobalTokens,
        },
        {
          destination: "core.scss",
          format: formats.scssVariables,
          filter: filter.FilterCoreTokens,
        },
        {
          destination: "breakpoints.scss",
          format: formats.scssVariables,
          filter: filter.FilterBreakpointTokens,
        },
      ],
      options: {
        fileExtension: ".scss",
        fileHeader: HeaderCalciteDefault,
      },
    },
    css: {
      transformGroup: CalciteTransformGroup,
      buildPath: "dist/css/",
      prefix: "calcite",
      files: [
        {
          destination: "global.css",
          format: formats.cssVariables,
          filter: filter.FilterGlobalTokens,
          options: {
            fileHeader: HeaderCalciteDeprecate,
          },
        },
        {
          destination: "semantic.css",
          format: formats.cssVariables,
          filter: filter.FilterGlobalTokens,
        },
        {
          destination: "core.css",
          format: formats.cssVariables,
          filter: filter.FilterCoreTokens,
        },
        {
          destination: "breakpoints.css",
          format: formats.cssVariables,
          filter: filter.FilterBreakpointTokens,
        },
      ],
      options: {
        fileExtension: ".css",
        fileHeader: HeaderCalciteDefault,
      },
    },
    es6: {
      transformGroup: CalciteTransformGroup,
      transforms: platformTransforms.es6,
      buildPath: "dist/es6/",
      prefix: "calcite",
      options: {
        fileExtension: ".ts",
        fileHeader: HeaderCalciteDefault,
      },
      files: [
        {
          destination: "global.ts",
          format: formats.javascriptEs6,
          filter: filter.FilterGlobalTokens,
          options: {
            fileHeader: HeaderCalciteDeprecate,
          },
        },
        {
          destination: "semantic.ts",
          format: formats.javascriptEs6,
          filter: filter.FilterGlobalTokens,
        },
        {
          destination: "core.ts",
          format: formats.javascriptEs6,
          filter: filter.FilterCoreTokens,
        },
        {
          destination: "breakpoints.ts",
          format: formats.javascriptEs6,
          filter: filter.FilterBreakpointTokens,
        },
      ],
    },
    docs: {
      transformGroup: CalciteTransformGroup,
      transforms: platformTransforms.es6,
      buildPath: "dist/docs/",
      prefix: "calcite",
      options: {
        fileExtension: ".json",
        fileHeader: HeaderCalciteDefault,
      },
      files: [
        {
          destination: "global.json",
          format: FormatCalciteDocs,
          filter: filter.FilterSourceTokens,
          options: {
            fileHeader: HeaderCalciteDeprecate,
          },
        },
        {
          destination: "semantic.json",
          format: FormatCalciteDocs,
          filter: filter.FilterSourceTokens,
        },
        {
          destination: "core.json",
          format: FormatCalciteDocs,
          filter: filter.FilterIncludeTokens,
        },
      ],
    },
    js: {
      transformGroup: CalciteTransformGroup,
      transforms: platformTransforms.es6,
      buildPath: "dist/js/",
      prefix: "calcite",
      options: {
        fileExtension: ".ts",
        fileHeader: HeaderCalciteDefault,
      },
      files: [
        {
          destination: "global.js",
          format: FormatCalciteJs,
          filter: filter.FilterSourceTokens,
          options: {
            fileHeader: HeaderCalciteDeprecate,
          },
        },
        {
          destination: "semantic.js",
          format: FormatCalciteJs,
          filter: filter.FilterSourceTokens,
        },
        {
          destination: "core.js",
          format: FormatCalciteJs,
          filter: filter.FilterIncludeTokens,
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
} as Config;
