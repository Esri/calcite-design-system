import { TransformedToken } from "style-dictionary";
import { formats, transformGroups, transforms } from "style-dictionary/enums";
import { nameRemoveTier } from "../../support/transforms/name/removeTier.js";
import { nameRemoveColorMode } from "../../support/transforms/name/removeColorMode.js";
import { nameIncludePlus } from "../../support/transforms/name/includePlus.js";
import { nameIncludeMinus } from "../../support/transforms/name/includeMinus.js";
import { HeaderCalciteDefault } from "../../support/header/calcite-default.js";
import { ValueMathSum } from "../../support/transforms/value/mathSum.js";
import { ActionGenerateSCSSBreakpoints } from "../../support/actions/scss/generateBreakpoints.js";
import { FilterLightColorTokens } from "../../support/filter/light.js";
import { FilterDarkColorTokens } from "../../support/filter/dark.js";

export default {
  actions: [ActionGenerateSCSSBreakpoints],
  transformGroup: transformGroups.scss,
  transforms: [
    ValueMathSum,
    transforms.nameKebab,
    nameRemoveTier,
    nameRemoveColorMode,
    nameIncludePlus,
    nameIncludeMinus,
  ],
  buildPath: "dist/",
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
      filter: (token: TransformedToken): boolean => {
        return (
          token.isSource &&
          token.type !== "dark" &&
          token.type !== "light" &&
          token.type !== "breakpoint" &&
          token.type !== "min" &&
          token.type !== "max" &&
          token.type !== "typography"
        );
      },
    },
  ],
  options: {
    fileHeader: HeaderCalciteDefault,
  },
};
