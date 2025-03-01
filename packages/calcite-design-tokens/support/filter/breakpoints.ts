import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const filterBreakpointTokens: Filter["filter"] = (token) => token.isSource && token.type === "breakpoint";

export const registerFilterBreakpointTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterBreakpointTokens,
    filter: filterBreakpointTokens,
  });

export const FilterBreakpointTokens = "filter/breakpoint-tokens";
