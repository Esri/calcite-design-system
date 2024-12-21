import StyleDictionary from "style-dictionary";
import { registerNameRemoveTier } from "./name/removeTier.js";
import { registerNameRemoveColorMode } from "./name/removeColorMode.js";
import { registerNameIncludePlus } from "./name/includePlus.js";
import { registerNameIncludeMinus } from "./name/includeMinus.js";
import { registerValueMathSum } from "./value/mathSum.js";
import { registerValueCSSShadow } from "./value/cssShadow.js";
import { registerValueSizePxToRem } from "./value/pxToRem.js";
import { registerNameRemoveDefault } from "./name/removeDefault.js";
import { registerCalciteTransformGroup } from "./group/calcite.js";

export async function registerCalciteTransformers(sd: typeof StyleDictionary): Promise<void> {
  registerValueCSSShadow(sd);
  registerNameRemoveTier(sd);
  registerNameRemoveDefault(sd);
  registerNameRemoveColorMode(sd);
  registerNameIncludePlus(sd);
  registerNameIncludeMinus(sd);
  registerValueMathSum(sd);
  registerValueSizePxToRem(sd);
  registerCalciteTransformGroup(sd);
}
