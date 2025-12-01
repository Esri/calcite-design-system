import { registerFormatDocs } from "./docs.ts";
import { registerFormatJs } from "./javascript.ts";
import { registerFormatTypography } from "./typography.ts";
import { registerFormatIndex } from "./index-file.ts";
import { registerFormatComponent } from "./component.ts";

export function registerFormats(): void {
  registerFormatDocs();
  registerFormatJs();
  registerFormatTypography();
  registerFormatIndex();
  registerFormatComponent();
}

export { FormatCalciteJs } from "./javascript.ts";
export { FormatCalciteDocs } from "./docs.ts";
export { FormatTypography } from "./typography.ts";
export { FormatIndex } from "./index-file.ts";
export { FormatComponent } from "./component.ts";
