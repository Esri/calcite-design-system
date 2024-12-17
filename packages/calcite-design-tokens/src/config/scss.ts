import { formats, transforms } from "style-dictionary/enums";
import { nameRemoveTier } from "../../support/transforms/name/removeTier.js";
import { nameRemoveColorMode } from "../../support/transforms/name/removeColorMode.js";
import { nameIncludePlus } from "../../support/transforms/name/includePlus.js";
import { nameIncludeMinus } from "../../support/transforms/name/includeMinus.js";
import { HeaderCalciteDefault } from "../../support/header/calcite-default.js";
import { ActionGenerateBreakpoints } from "../../support/actions/generateBreakpoints.js";
import { FilterLightColorTokens } from "../../support/filter/light.js";
import { FilterDarkColorTokens } from "../../support/filter/dark.js";
import { FilterGlobalTokens } from "../../support/filter/global.js";

export default {
  actions: [ActionGenerateBreakpoints],
  transformGroup: "tokens-studio",
  transforms: [transforms.nameKebab, nameRemoveTier, nameRemoveColorMode, nameIncludePlus, nameIncludeMinus],
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
