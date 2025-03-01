import { TransformedToken } from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";

export function filterSourceTokens(token: TransformedToken): boolean {
  return token.isSource;
}

export const registerFilterSourceTokens: RegisterFn = async (sd) => {
  sd.registerFilter({
    name: FilterSourceTokens,
    filter: filterSourceTokens,
  });
};

export const FilterSourceTokens = "filter/sourceTokens";
