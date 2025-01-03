import StyleDictionary from "style-dictionary";
import { registerFilterGlobalTokens } from "./global.js";
import { registerFilterLightColorTokens } from "./light.js";
import { registerFilterDarkColorTokens } from "./dark.js";
import { registerFilterBreakpointTokens } from "./breakpoints.js";
import { registerFilterTypographyTokens } from "./typography.js";
import { registerFilterCoreTokens } from "./core.js";

export async function registerCalciteFilters(sd: typeof StyleDictionary): Promise<void> {
  await registerFilterBreakpointTokens(sd);
  await registerFilterDarkColorTokens(sd);
  await registerFilterGlobalTokens(sd);
  await registerFilterLightColorTokens(sd);
  await registerFilterTypographyTokens(sd);
  await registerFilterCoreTokens(sd);
}
