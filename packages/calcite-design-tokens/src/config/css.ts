import { formats } from "style-dictionary/enums";
import { HeaderCalciteDefault } from "../../support/header/calcite-default.js";
import { FilterLightColorTokens } from "../../support/filter/light.js";
import { FilterDarkColorTokens } from "../../support/filter/dark.js";
import { FilterGlobalTokens } from "../../support/filter/global.js";
import { CalciteTransformGroup } from "../../support/transforms/group/calcite.js";
import { FilterBreakpointTokens } from "../../support/filter/breakpoints.js";
import { FilterCoreTokens } from "../../support/filter/core.js";

export default {
  transformGroup: CalciteTransformGroup,
  buildPath: "dist/css/",
  prefix: "calcite",
  files: [
    {
      destination: "light.css",
      format: formats.cssVariables,
      filter: FilterLightColorTokens,
    },
    {
      destination: "dark.css",
      format: formats.cssVariables,
      filter: FilterDarkColorTokens,
    },
    {
      destination: "global.css",
      format: formats.cssVariables,
      filter: FilterGlobalTokens,
    },
    {
      destination: "core.css",
      format: formats.cssVariables,
      filter: FilterCoreTokens,
    },
    {
      destination: "breakpoints.css",
      format: formats.cssVariables,
      filter: FilterBreakpointTokens,
    },
  ],
  options: {
    fileExtension: ".css",
    fileHeader: HeaderCalciteDefault,
  },
};
