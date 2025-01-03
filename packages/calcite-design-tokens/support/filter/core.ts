import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterCoreTokens(token: TransformedToken): boolean {
  return (
    !token.isSource &&
    !(token.type === "breakpoint" || token.type === "min" || token.type === "max" || token.type === "typography")
  );
}

export function registerFilterCoreTokens(sd: typeof StyleDictionary): void {
  return sd.registerFilter({
    name: FilterCoreTokens,
    filter: filterCoreTokens,
  });
}

export const FilterCoreTokens = "filter/CoreTokens";
