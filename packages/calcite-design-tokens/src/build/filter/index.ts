import { registerFilterSemanticTokens } from "./semantic.js";
import { registerFilterLightColorTokens } from "./light.js";
import { registerFilterDarkColorTokens } from "./dark.js";
import { registerFilterBreakpointTokens } from "./breakpoints.js";
import { registerFilterTypographyTokens } from "./typography.js";
import { registerFilterCoreTokens } from "./core.js";
import { registerFilterSourceTokens } from "./source.js";
import { registerFilterIncludeTokens } from "./include.js";
import { registerFilterGlobalTokens } from "./global.js";
import { registerFilterLightOrDarkColorTokens } from "./light-or-dark.js";
import { registerFilterGlobalTokensJs } from "./global-js.js";

export function registerFilters(): void {
  registerFilterBreakpointTokens();
  registerFilterDarkColorTokens();
  registerFilterSemanticTokens();
  registerFilterGlobalTokens();
  registerFilterGlobalTokensJs();
  registerFilterLightColorTokens();
  registerFilterLightOrDarkColorTokens();
  registerFilterTypographyTokens();
  registerFilterCoreTokens();
  registerFilterSourceTokens();
  registerFilterIncludeTokens();
}

export { FilterGlobalTokens } from "./global.js";
export { FilterGlobalTokensJs } from "./global-js.js";
export { FilterSemanticTokens } from "./semantic.js";
export { FilterBreakpointTokens } from "./breakpoints.js";
export { FilterCoreTokens } from "./core.js";
export { FilterLightColorTokens } from "./light.js";
export { FilterDarkColorTokens } from "./dark.js";
export { FilterLightOrDarkColorTokens } from "./light-or-dark.js";
export { FilterSourceTokens } from "./source.js";
export { FilterIncludeTokens } from "./include.js";
export { FilterTypographyTokens } from "./typography.js";
