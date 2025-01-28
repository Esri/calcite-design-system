import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterIncludeTokens(token: TransformedToken): boolean {
  return !token.isSource;
}

export function registerFilterIncludeTokens(sd: typeof StyleDictionary): void {
  sd.registerFilter({
    name: FilterIncludeTokens,
    filter: filterIncludeTokens,
  });
}

export const FilterIncludeTokens = "filter/includeTokens";
