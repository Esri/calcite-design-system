import StyleDictionary from "style-dictionary";
import { registerFormatSCSSMixins } from "./scss-mixins.js";
import { registerFormatDocs } from "./docs.js";
import { registerFormatJs } from "./javascript.js";

export async function registerCalciteFormats(sd: typeof StyleDictionary): Promise<void> {
  await registerFormatSCSSMixins(sd);
  await registerFormatDocs(sd);
  await registerFormatJs(sd);
}
