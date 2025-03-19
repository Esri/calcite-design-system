import { registerFormatDocs } from "./docs.js";
import { registerFormatJs } from "./javascript.js";
import { registerFormatTypography } from "./typography.js";
import { registerFormatIndex } from "./index-file.js";

export async function registerFormats(): Promise<void> {
  await Promise.all([registerFormatDocs(), registerFormatJs(), registerFormatTypography(), registerFormatIndex()]);
}

export { FormatCalciteJs } from "./javascript.js";
export { FormatCalciteDocs } from "./docs.js";
export { FormatTypography } from "./typography.js";
export { FormatIndex } from "./index-file.js";
