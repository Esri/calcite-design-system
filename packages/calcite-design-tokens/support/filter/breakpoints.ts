import { TransformedToken } from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";

export function filterBreakpointTokens(token: TransformedToken): boolean {
  return token.isSource && token.type === "breakpoint";
}

export const registerFilterBreakpointTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterBreakpointTokens,
    filter: filterBreakpointTokens,
  });

export const FilterBreakpointTokens = "filter/breakpoint-tokens";
