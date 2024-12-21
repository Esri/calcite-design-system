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
  ],
  options: {
    fileHeader: HeaderCalciteDefault,
  },
};
