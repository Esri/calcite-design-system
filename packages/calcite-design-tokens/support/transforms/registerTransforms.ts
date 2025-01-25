import StyleDictionary from "style-dictionary";
import { registerNameRemoveTier } from "./name/removeTier.js";
import { registerNameRemoveColorMode } from "./name/removeColorMode.js";
import { registerNameIncludePlusMinus } from "./name/includePlusMinus.js";
import { registerValueMathSum } from "./value/mathSum.js";
import { registerValueCSSShadow } from "./value/cssShadow.js";
import { registerValueSizePxToRem } from "./value/pxToRem.js";
import { registerNameRemoveDefault } from "./name/removeDefault.js";
import { registerCalciteTransformGroup } from "./group/calcite.js";
import { registerValueSizeUnitlessToPx } from "./value/unitlessBreakpointToPx.js";

export async function registerCalciteTransformers(sd: typeof StyleDictionary): Promise<void> {
  registerValueCSSShadow(sd);
  registerNameRemoveTier(sd);
  registerNameRemoveDefault(sd);
  registerNameRemoveColorMode(sd);
  registerNameIncludePlusMinus(sd);
  registerValueMathSum(sd);
  registerValueSizePxToRem(sd);
  registerValueSizeUnitlessToPx(sd);
  registerCalciteTransformGroup(sd);
}
