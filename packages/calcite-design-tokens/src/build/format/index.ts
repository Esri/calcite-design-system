import { registerFormatDocs } from "./docs.js";
import { registerFormatJs } from "./javascript.js";
import { registerFormatTypography } from "./typography.js";
import { registerFormatIndex } from "./index-file.js";
import { registerFormatComponent } from "./component.js";

export function registerFormats(): void {
  registerFormatDocs();
  registerFormatJs();
  registerFormatTypography();
  registerFormatIndex();
  registerFormatComponent();
}

export { FormatCalciteJs } from "./javascript.js";
export { FormatCalciteDocs } from "./docs.js";
export { FormatTypography } from "./typography.js";
export { FormatIndex } from "./index-file.js";
export { FormatComponent } from "./component.js";
