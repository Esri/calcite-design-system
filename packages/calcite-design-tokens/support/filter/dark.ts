import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterDarkColorTokens(token: TransformedToken): boolean {
  return token.isSource && token.type === "color" && token.path[token.path.length - 1] === "dark";
}

export function registerFilterDarkColorTokens(sd: StyleDictionary): void {
  return sd.registerFilter({
    name: FilterDarkColorTokens,
    filter: filterDarkColorTokens,
  });
}

export const FilterDarkColorTokens = "filter/DarkColorTokens";
