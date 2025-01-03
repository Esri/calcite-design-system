import { formats } from "style-dictionary/enums";
import { PlatformConfig } from "style-dictionary/types";
import { HeaderCalciteDefault } from "../../support/header/calcite-default.js";
import { FilterLightColorTokens } from "../../support/filter/light.js";
import { FilterDarkColorTokens } from "../../support/filter/dark.js";
import { FilterGlobalTokens } from "../../support/filter/global.js";
import { FilterBreakpointTokens } from "../../support/filter/breakpoints.js";
import { CalciteTransformGroup } from "../../support/transforms/group/calcite.js";
import { FilterCoreTokens } from "../../support/filter/core.js";

export default {
  transformGroup: CalciteTransformGroup,
  buildPath: "dist/scss/",
  prefix: "calcite",
  files: [
    {
      destination: "light.scss",
      format: formats.scssVariables,
      filter: FilterLightColorTokens,
    },
    {
      destination: "dark.scss",
      format: formats.scssVariables,
      filter: FilterDarkColorTokens,
    },
    {
      destination: "global.scss",
      format: formats.scssVariables,
      filter: FilterGlobalTokens,
    },
    {
      destination: "core.scss",
      format: formats.scssVariables,
      filter: FilterCoreTokens,
    },
    {
      destination: "breakpoints.scss",
      format: formats.scssVariables,
      filter: FilterBreakpointTokens,
    },
  ],
  options: {
    fileExtension: ".scss",
    fileHeader: HeaderCalciteDefault,
  },
} as PlatformConfig;
