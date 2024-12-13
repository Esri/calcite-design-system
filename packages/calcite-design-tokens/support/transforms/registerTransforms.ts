import StyleDictionary from "style-dictionary";
import { registerNameRemoveTier } from "./name/removeTier.js";
import { registerNameRemoveColorMode } from "./name/removeColorMode.js";
import { registerNameIncludePlus } from "./name/includePlus.js";
import { registerNameIncludeMinus } from "./name/includeMinus.js";
import { registerMathSum } from "./value/mathSum.js";

export async function registerCalciteTransformers(sd: StyleDictionary): Promise<void> {
  registerNameRemoveTier(sd);
  registerNameRemoveColorMode(sd);
  registerNameIncludePlus(sd);
  registerNameIncludeMinus(sd);
  registerMathSum(sd);
}
