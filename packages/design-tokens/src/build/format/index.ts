import { registerFormatDocs } from "./docs.ts";
import { registerFormatIndex } from "./index-file.ts";
import { registerFormatJs } from "./javascript.ts";
import { registerFormatLightDark } from "./light-dark.ts";
import { registerFormatTypography } from "./typography.ts";

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
export { FormatIndex } from "./index-file.ts";
export { FormatLightDark } from "./light-dark.ts";
