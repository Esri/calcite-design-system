import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterTypographyTokens(token: TransformedToken): boolean {
  return token.isSource && token.type === "typography";
}

export function registerFilterTypographyTokens(sd: typeof StyleDictionary): void {
  return sd.registerFilter({
    name: FilterTypographyTokens,
    filter: filterTypographyTokens,
  });
}

export const FilterTypographyTokens = "filter/typography-tokens";
