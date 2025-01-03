import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterBreakpointTokens(token: TransformedToken): boolean {
  return token.isSource && token.type === "breakpoint";
}

export function registerFilterBreakpointTokens(sd: typeof StyleDictionary): void {
  return sd.registerFilter({
    name: FilterBreakpointTokens,
    filter: filterBreakpointTokens,
  });
}

export const FilterBreakpointTokens = "filter/breakpoint-tokens";
