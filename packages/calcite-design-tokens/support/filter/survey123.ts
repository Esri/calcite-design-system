import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterSurvey123Tokens(token: TransformedToken): boolean {
  return token.isSource && token.filePath.includes("survey123");
}

export function registerFilterSurvey123Tokens(sd: typeof StyleDictionary): void {
  return sd.registerFilter({
    name: FilterSurvey123Tokens,
    filter: filterSurvey123Tokens,
  });
}

export const FilterSurvey123Tokens = "filter/Survey123Tokens";
