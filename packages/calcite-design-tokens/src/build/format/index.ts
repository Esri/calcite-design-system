import StyleDictionary from "style-dictionary";
import { registerFormatDocs } from "./docs.js";
import { registerFormatJs } from "./javascript.js";
import { registerFormatTypography } from "./typography.js";
import { registerFormatIndex } from "./index-file.js";

export async function registerFormats(sd: typeof StyleDictionary): Promise<void> {
  await Promise.all([
    registerFormatDocs(sd),
    registerFormatJs(sd),
    registerFormatTypography(sd),
    registerFormatIndex(sd),
  ]);
}

export { FormatCalciteJs } from "./javascript.js";
export { FormatCalciteDocs } from "./docs.js";
export { FormatTypography } from "./typography.js";
export { FormatIndex } from "./index-file.js";
