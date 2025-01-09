import StyleDictionary from "style-dictionary";
import { registerFilterGlobalTokens } from "./global.js";
import { registerFilterLightColorTokens } from "./light.js";
import { registerFilterDarkColorTokens } from "./dark.js";
import { registerFilterBreakpointTokens } from "./breakpoints.js";
import { registerFilterTypographyTokens } from "./typography.js";
import { registerFilterCoreTokens } from "./core.js";
import { registerFilterSurvey123Tokens } from "./survey123.js";
import { registerFilterDevSummitTokens } from "./devSummit.js";
import { registerFilterCalciteTokens } from "./calcite.js";

export async function registerCalciteFilters(sd: typeof StyleDictionary): Promise<void> {
  await Promise.all([
    registerFilterBreakpointTokens(sd),
    registerFilterDarkColorTokens(sd),
    registerFilterGlobalTokens(sd),
    registerFilterLightColorTokens(sd),
    registerFilterTypographyTokens(sd),
    registerFilterCoreTokens(sd),
    registerFilterCalciteTokens(sd),
    registerFilterSurvey123Tokens(sd),
    registerFilterDevSummitTokens(sd),
  ]);
}
