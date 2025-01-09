import StyleDictionary, { TransformedToken } from "style-dictionary";

export function filterCalciteTokens(token: TransformedToken): boolean {
  return token.isSource && token.type === "color" && token.filePath.includes("calcite");
}

export function registerFilterCalciteTokens(sd: typeof StyleDictionary): void {
  return sd.registerFilter({
    name: FilterCalciteTokens,
    filter: filterCalciteTokens,
  });
}

export const FilterCalciteTokens = "filter/CalciteTokens";
