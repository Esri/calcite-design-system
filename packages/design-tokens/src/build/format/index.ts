import { registerFormatCore } from "./core.ts";
import { registerFormatDocs } from "./docs.ts";
import { registerFormatIndex } from "./index-file.ts";
import { registerFormatJs } from "./javascript.ts";
import { registerFormatLightDark } from "./light-dark.ts";
import { registerFormatTypography } from "./typography.ts";

export function registerFormats(): void {
  registerFormatCore();
  registerFormatDocs();
  registerFormatJs();
  registerFormatTypography();
  registerFormatIndex();
  registerFormatLightDark();
}

export { FormatCore } from "./core.ts";
export { FormatCalciteJs } from "./javascript.ts";
export { FormatCalciteDocs } from "./docs.ts";
export { FormatTypography } from "./typography.ts";
export { FormatIndex } from "./index-file.ts";
export { FormatLightDark } from "./light-dark.ts";
