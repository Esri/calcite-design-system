import { TransformedToken } from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";

export function filterIncludeTokens(token: TransformedToken): boolean {
  return !token.isSource;
}

export const registerFilterIncludeTokens: RegisterFn = async (sd) => {
  sd.registerFilter({
    name: FilterIncludeTokens,
    filter: filterIncludeTokens,
  });
};

export const FilterIncludeTokens = "filter/includeTokens";
