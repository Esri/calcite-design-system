import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/types.d.ts";
import { isBreakpointMinToken } from "../utils/token-types.ts";

/**
 * This filter is used to merge individual min/max container size tokens into a single parent one for ES6, which only uses the min token.
 */

export const filterBreakpointMinTokens: Filter["filter"] = (token) => {
  return token.isSource && isBreakpointMinToken(token);
};

export const registerFilterEs6BreakpointTokens: RegisterFn = () => {
  StyleDictionary.registerFilter({
    name: FilterEs6BreakpointTokens,
    filter: filterBreakpointMinTokens,
  });
};

export const FilterEs6BreakpointTokens = "calcite/filter/tokens/es6-breakpoints";
