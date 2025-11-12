import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/interfaces.d.ts";
import { isBreakpoint } from "../utils/token-types.ts";

export const filterBreakpointTokens: Filter["filter"] = (token) => token.isSource && isBreakpoint(token);

export const registerFilterBreakpointTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterBreakpointTokens,
    filter: filterBreakpointTokens,
  });

export const FilterBreakpointTokens = "calcite/filter/tokens/breakpoint";
