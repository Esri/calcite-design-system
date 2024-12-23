import { formats } from "style-dictionary/enums";
import { HeaderCalciteDefault } from "../../support/header/calcite-default.js";
import { ActionGenerateBreakpoints } from "../../support/actions/generateBreakpoints.js";
import { FilterLightColorTokens } from "../../support/filter/light.js";
import { FilterDarkColorTokens } from "../../support/filter/dark.js";
import { FilterGlobalTokens } from "../../support/filter/global.js";
import { CalciteTransformGroup } from "../../support/transforms/group/calcite.js";

export default {
  actions: [ActionGenerateBreakpoints],
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
  ],
  options: {
    fileExtension: ".css",
    fileHeader: HeaderCalciteDefault,
  },
};
