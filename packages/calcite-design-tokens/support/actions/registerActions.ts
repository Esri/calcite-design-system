import { registerGenerateSCSSBreakpoints } from "./scss/generateBreakpoints.js";

export async function registerCalciteActions(sd: StyleDictionary): Promise<void> {
  registerGenerateSCSSBreakpoints(sd);
}
