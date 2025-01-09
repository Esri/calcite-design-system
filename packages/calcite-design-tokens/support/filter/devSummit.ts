import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterDevSummitTokens(token: TransformedToken): boolean {
  return token.isSource && token.filePath.includes("dev-summit");
}

export function registerFilterDevSummitTokens(sd: typeof StyleDictionary): void {
  return sd.registerFilter({
    name: FilterDevSummitTokens,
    filter: filterDevSummitTokens,
  });
}

export const FilterDevSummitTokens = "filter/DevSummitTokens";
