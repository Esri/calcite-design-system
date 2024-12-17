import StyleDictionary from "style-dictionary";
import { registerGenerateBreakpoints } from "./generateBreakpoints.js";

export async function registerCalciteActions(sd: typeof StyleDictionary): Promise<void> {
  registerGenerateBreakpoints(sd);
}
