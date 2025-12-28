import { registerFilterSemanticTokens } from "./semantic.ts";
import { registerFilterLightColorTokens } from "./light.ts";
import { registerFilterDarkColorTokens } from "./dark.ts";
import { registerFilterBreakpointTokens } from "./breakpoints.ts";
import { registerFilterTypographyTokens } from "./typography.ts";
import { registerFilterCoreTokens } from "./core.ts";
import { registerFilterSourceTokens } from "./source.ts";
import { registerFilterIncludeTokens } from "./include.ts";
import { registerFilterGlobalTokens } from "./global.ts";
import { registerFilterLightOrDarkColorTokens } from "./light-or-dark.ts";
import { registerFilterGlobalTokensJs } from "./global-js.ts";

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

export { FilterGlobalTokens } from "./global.ts";
export { FilterGlobalTokensJs } from "./global-js.ts";
export { FilterSemanticTokens } from "./semantic.ts";
export { FilterBreakpointTokens } from "./breakpoints.ts";
export { FilterCoreTokens } from "./core.ts";
export { FilterLightColorTokens } from "./light.ts";
export { FilterDarkColorTokens } from "./dark.ts";
export { FilterLightOrDarkColorTokens } from "./light-or-dark.ts";
export { FilterSourceTokens } from "./source.ts";
export { FilterIncludeTokens } from "./include.ts";
export { FilterTypographyTokens } from "./typography.ts";
