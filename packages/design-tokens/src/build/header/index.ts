import { registerDefaultFileHeader } from "./default.ts";
import { registerDeprecateFileHeader } from "./deprecate.ts";

export function registerFileHeaders(): void {
  registerDefaultFileHeader();
  registerDeprecateFileHeader();
}

export { HeaderDefault } from "./default.ts";
export { HeaderDeprecate } from "./deprecate.ts";
