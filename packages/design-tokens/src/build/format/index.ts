import { registerFormatDocs } from "./docs.ts";
import { registerFormatJs } from "./javascript.ts";
import { registerFormatTypography } from "./typography.ts";
import { registerFormatIndex } from "./index-file.ts";
import { registerFormatIndexLightDark, registerFormatLightDark } from "./light-dark-file.ts";

export function registerFormats(): void {
  registerFormatDocs();
  registerFormatJs();
  registerFormatTypography();
  registerFormatIndex();
  registerFormatLightDark();
  registerFormatIndexLightDark();
}

export { FormatCalciteJs } from "./javascript.ts";
export { FormatCalciteDocs } from "./docs.ts";
export { FormatTypography } from "./typography.ts";
export { FormatIndex } from "./index-file.ts";
export { FormatIndexLightDark, FormatLightDark } from "./light-dark-file.ts";
