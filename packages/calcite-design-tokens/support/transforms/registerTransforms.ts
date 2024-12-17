import StyleDictionary from "style-dictionary";
import { registerNameRemoveTier } from "./name/removeTier.js";
import { registerNameRemoveColorMode } from "./name/removeColorMode.js";
import { registerNameIncludePlus } from "./name/includePlus.js";
import { registerNameIncludeMinus } from "./name/includeMinus.js";

export async function registerCalciteTransformers(sd: typeof StyleDictionary): Promise<void> {
  registerNameRemoveTier(sd);
  registerNameRemoveColorMode(sd);
  registerNameIncludePlus(sd);
  registerNameIncludeMinus(sd);
}
