import StyleDictionary from "style-dictionary";
import { registerFilterSemanticTokens } from "./semantic.js";
import { registerFilterLightColorTokens } from "./light.js";
import { registerFilterDarkColorTokens } from "./dark.js";
import { registerFilterBreakpointTokens } from "./breakpoints.js";
import { registerFilterTypographyTokens } from "./typography.js";
import { registerFilterCoreTokens } from "./core.js";
import { registerFilterSourceTokens } from "./source.js";
import { registerFilterIncludeTokens } from "./include.js";
import { registerFilterGlobalTokens } from "./global.js";
import { registerFilterLightOrDarkColorTokens } from "./lightOrDark.js";

export async function registerCalciteFilters(sd: typeof StyleDictionary): Promise<void> {
  await Promise.all([
    registerFilterBreakpointTokens(sd),
    registerFilterDarkColorTokens(sd),
    registerFilterSemanticTokens(sd),
    registerFilterGlobalTokens(sd),
    registerFilterLightColorTokens(sd),
    registerFilterLightOrDarkColorTokens(sd),
    registerFilterTypographyTokens(sd),
    registerFilterCoreTokens(sd),
    registerFilterSourceTokens(sd),
    registerFilterIncludeTokens(sd),
  ]);
}

export { FilterGlobalTokens } from "./global.js";
export { FilterSemanticTokens } from "./semantic.js";
export { FilterBreakpointTokens } from "./breakpoints.js";
export { FilterCoreTokens } from "./core.js";
export { FilterLightColorTokens } from "./light.js";
export { FilterDarkColorTokens } from "./dark.js";
export { FilterLightOrDarkColorTokens } from "./lightOrDark.js";
export { FilterSourceTokens } from "./source.js";
export { FilterIncludeTokens } from "./include.js";
export { FilterTypographyTokens } from "./typography.js";
