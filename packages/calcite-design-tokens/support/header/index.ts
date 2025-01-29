import StyleDictionary from "style-dictionary";
import { registerCalciteDefaultFileHeader } from "./calcite-default.js";
import { registerCalciteDeprecateFileHeader } from "./calcite-deprecate.js";

export async function registerCalciteFileHeaders(sd: typeof StyleDictionary): Promise<void> {
  await registerCalciteDefaultFileHeader(sd);
  await registerCalciteDeprecateFileHeader(sd);
}

export { HeaderCalciteDefault } from "./calcite-default.js";
export { HeaderCalciteDeprecate } from "./calcite-deprecate.js";
