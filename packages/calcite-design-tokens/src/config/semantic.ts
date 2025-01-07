import { logBrokenReferenceLevels, logWarningLevels, logVerbosityLevels } from "style-dictionary/enums";
import { formats } from "style-dictionary/enums";
import { expandTypesMap } from "@tokens-studio/sd-transforms";
import { HeaderCalciteDefault } from "../../support/header/calcite-default.js";
import { CalciteTransformGroup } from "../../support/transforms/group/calcite.js";
import * as filter from "../../support/filter/index.js";

const sdTypes = expandTypesMap;

export default {
  // configuration
  source: ["src/semantic/**/*.json"],
  include: ["src/core/*.json"],
  preprocessors: ["tokens-studio"],
  platforms: {
    scss: {
      transformGroup: CalciteTransformGroup,
      buildPath: "dist/scss/",
      prefix: "calcite",
      files: [
        {
          destination: "light.scss",
          format: formats.scssVariables,
          filter: filter.FilterLightColorTokens,
        },
        {
          destination: "dark.scss",
          format: formats.scssVariables,
          filter: filter.FilterDarkColorTokens,
        },
        {
          destination: "global.scss",
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
          destination: "light.css",
          format: formats.cssVariables,
          filter: filter.FilterLightColorTokens,
        },
        {
          destination: "dark.css",
          format: formats.cssVariables,
          filter: filter.FilterDarkColorTokens,
        },
        {
          destination: "global.css",
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
