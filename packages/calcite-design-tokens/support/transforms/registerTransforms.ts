import StyleDictionary from "style-dictionary";
import { registerNameRemoveTier } from "./name/removeTier.js";
import { registerNameRemoveColorMode } from "./name/removeColorMode.js";
import { registerNameIncludePlus } from "./name/includePlus.js";
import { registerNameIncludeMinus } from "./name/includeMinus.js";
import { registerValueMathSum } from "./value/mathSum.js";
import { registerValueShadowShorthand } from "./value/shadow.js";

export async function registerCalciteTransformers(sd: typeof StyleDictionary): Promise<void> {
  registerValueShadowShorthand(sd);
  registerNameRemoveTier(sd);
  registerNameRemoveColorMode(sd);
  registerNameIncludePlus(sd);
  registerNameIncludeMinus(sd);
  registerValueMathSum(sd);
}
