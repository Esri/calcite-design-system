import { registerDefaultFileHeader } from "./default.js";
import { registerDeprecateFileHeader } from "./deprecate.js";

export function registerFileHeaders(): void {
  registerDefaultFileHeader();
  registerDeprecateFileHeader();
}

export { HeaderDefault } from "./default.js";
export { HeaderDeprecate } from "./deprecate.js";
