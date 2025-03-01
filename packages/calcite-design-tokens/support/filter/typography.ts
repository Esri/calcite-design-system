import { TransformedToken } from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";

export function filterTypographyTokens(token: TransformedToken): boolean {
  return token.isSource && token.type === "typography";
}

export const registerFilterTypographyTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterTypographyTokens,
    filter: filterTypographyTokens,
  });

export const FilterTypographyTokens = "filter/typography-tokens";
