import StyleDictionary from "style-dictionary";
import { registerDefaultFileHeader } from "./default.js";
import { registerDeprecateFileHeader } from "./deprecate.js";

export async function registerFileHeaders(sd: typeof StyleDictionary): Promise<void> {
  await Promise.all([registerDefaultFileHeader(sd), registerDeprecateFileHeader(sd)]);
}

export { HeaderDefault } from "./default.js";
export { HeaderDeprecate } from "./deprecate.js";
