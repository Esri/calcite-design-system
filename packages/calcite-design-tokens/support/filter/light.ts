import { TransformedToken } from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";

export function filterLightColorTokens(token: TransformedToken): boolean {
  return token.isSource && token.type === "color" && token.path[token.path.length - 1] === "light";
}

export const registerFilterLightColorTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterLightColorTokens,
    filter: filterLightColorTokens,
  });

export const FilterLightColorTokens = "filter/lightColorTokens";
