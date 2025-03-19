import { registerDefaultFileHeader } from "./default.js";
import { registerDeprecateFileHeader } from "./deprecate.js";

export async function registerFileHeaders(): Promise<void> {
  await Promise.all([registerDefaultFileHeader(), registerDeprecateFileHeader()]);
}

export { HeaderDefault } from "./default.js";
export { HeaderDeprecate } from "./deprecate.js";
