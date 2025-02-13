import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterLightColorTokens(token: TransformedToken): boolean {
  return token.isSource && token.type === "color" && token.path[token.path.length - 1] === "light";
}

export function registerFilterLightColorTokens(sd: typeof StyleDictionary): void {
  return sd.registerFilter({
    name: FilterLightColorTokens,
    filter: filterLightColorTokens,
  });
}

export const FilterLightColorTokens = "filter/lightColorTokens";
