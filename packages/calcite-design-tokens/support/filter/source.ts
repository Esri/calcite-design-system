import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterSourceTokens(token: TransformedToken): boolean {
  return token.isSource;
}

export function registerFilterSourceTokens(sd: typeof StyleDictionary): void {
  sd.registerFilter({
    name: FilterSourceTokens,
    filter: filterSourceTokens,
  });
}

export const FilterSourceTokens = "filter/sourceTokens";
