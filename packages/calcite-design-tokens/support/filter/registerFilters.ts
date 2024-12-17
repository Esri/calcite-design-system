import StyleDictionary from "style-dictionary";
import { registerFilterGlobalTokens } from "./global.js";
import { registerFilterLightColorTokens } from "./light.js";
import { registerFilterDarkColorTokens } from "./dark.js";

export async function registerCalciteFilters(sd: typeof StyleDictionary): Promise<void> {
  await registerFilterGlobalTokens(sd);
  await registerFilterLightColorTokens(sd);
  await registerFilterDarkColorTokens(sd);
}
