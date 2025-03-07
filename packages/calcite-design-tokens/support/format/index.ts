import StyleDictionary from "style-dictionary";
import { registerFormatSCSSMixins } from "./scss-mixins.js";
import { registerFormatDocs } from "./docs.js";
import { registerFormatJs } from "./javascript.js";
import { registerFormatTypography } from "./typography.js";
import { registerFormatIndex } from "./indexFile.js";

export async function registerCalciteFormats(sd: typeof StyleDictionary): Promise<void> {
  await Promise.all([
    registerFormatSCSSMixins(sd),
    registerFormatDocs(sd),
    registerFormatJs(sd),
    registerFormatTypography(sd),
    registerFormatIndex(sd),
  ]);
}

export { FormatCalciteJs } from "./javascript.js";
export { FormatCalciteSCSSMixins } from "./scss-mixins.js";
export { FormatCalciteDocs } from "./docs.js";
export { FormatTypography } from "./typography.js";
export { FormatIndex } from "./indexFile.js";
