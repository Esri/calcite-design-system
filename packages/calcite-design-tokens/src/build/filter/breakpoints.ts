import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";
import { isBreakpoint } from "../utils/token-types.js";

export const filterBreakpointTokens: Filter["filter"] = (token) => token.isSource && isBreakpoint(token);

export const registerFilterBreakpointTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterBreakpointTokens,
    filter: filterBreakpointTokens,
  });

export const FilterBreakpointTokens = "calcite/filter/tokens/breakpoint";
