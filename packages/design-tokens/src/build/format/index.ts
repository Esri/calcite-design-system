import { registerFormatDocs } from "./docs.ts";
import { registerFormatJs } from "./javascript.ts";
import { registerFormatTypography } from "./typography.ts";
import { registerFormatIndex, registerFormatLightDark } from "./index-file.ts";

export function registerFormats(): void {
  registerFormatDocs();
  registerFormatJs();
  registerFormatTypography();
  registerFormatIndex();
  registerFormatLightDark();
}

export { FormatCalciteJs } from "./javascript.ts";
export { FormatCalciteDocs } from "./docs.ts";
export { FormatTypography } from "./typography.ts";
export { FormatIndex, FormatLightDark } from "./index-file.ts";
