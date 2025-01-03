import StyleDictionary from "style-dictionary";
import { registerFormatSCSSMixins } from "./scss-mixins.js";

export async function registerCalciteFormats(sd: typeof StyleDictionary): Promise<void> {
  await registerFormatSCSSMixins(sd);
}
