import { TransformedToken } from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";

export function filterGlobalTokens(token: TransformedToken): boolean {
  return (
    token.isSource &&
    !(
      token.type === "color" ||
      token.type === "dark" ||
      token.type === "light" ||
      token.type === "breakpoint" ||
      token.type === "min" ||
      token.type === "max" ||
      token.type === "typography"
    )
  );
}

export const registerFilterGlobalTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterGlobalTokens,
    filter: filterGlobalTokens,
  });

export const FilterGlobalTokens = "filter/GlobalTokens";
