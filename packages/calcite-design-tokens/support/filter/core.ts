import { TransformedToken } from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";

export function filterCoreTokens(token: TransformedToken): boolean {
  return (
    !token.isSource &&
    !(token.type === "breakpoint" || token.type === "min" || token.type === "max" || token.type === "typography")
  );
}

export const registerFilterCoreTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterCoreTokens,
    filter: filterCoreTokens,
  });

export const FilterCoreTokens = "filter/CoreTokens";
