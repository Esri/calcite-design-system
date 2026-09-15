import { registerFormatDocs } from "./docs.ts";
import { registerFormatJs } from "./javascript.ts";
import { registerFormatTypography } from "./typography.ts";
import { registerFormatIndex } from "./index-file.ts";
import { registerFormatSemanticCss } from "./semantic-css.ts";

export function registerFormats(): void {
  registerFormatDocs();
  registerFormatJs();
  registerFormatTypography();
  registerFormatIndex();
  registerFormatSemanticCss();
}

export { FormatCalciteJs } from "./javascript.ts";
export { FormatCalciteDocs } from "./docs.ts";
export { FormatTypography } from "./typography.ts";
export { FormatIndex } from "./index-file.ts";
export { FormatSemanticCss } from "./semantic-css.ts";
