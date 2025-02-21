import StyleDictionary from "style-dictionary";
import { registerFilterGlobalTokens } from "./global.js";
import { registerFilterLightColorTokens } from "./light.js";
import { registerFilterDarkColorTokens } from "./dark.js";
import { registerFilterBreakpointTokens } from "./breakpoints.js";
import { registerFilterTypographyTokens } from "./typography.js";
import { registerFilterCoreTokens } from "./core.js";
import { registerFilterSourceTokens } from "./source.js";
import { registerFilterIncludeTokens } from "./include.js";

export async function registerCalciteFilters(sd: typeof StyleDictionary): Promise<void> {
  await Promise.all([
    registerFilterBreakpointTokens(sd),
    registerFilterDarkColorTokens(sd),
    registerFilterGlobalTokens(sd),
    registerFilterLightColorTokens(sd),
    registerFilterTypographyTokens(sd),
    registerFilterCoreTokens(sd),
    registerFilterSourceTokens(sd),
    registerFilterIncludeTokens(sd),
  ]);
}

export { FilterGlobalTokens } from "./global.js";
export { FilterBreakpointTokens } from "./breakpoints.js";
export { FilterCoreTokens } from "./core.js";
export { FilterLightColorTokens } from "./light.js";
export { FilterDarkColorTokens } from "./dark.js";
export { FilterSourceTokens } from "./source.js";
export { FilterIncludeTokens } from "./include.js";
export { FilterTypographyTokens } from "./typography.js";
