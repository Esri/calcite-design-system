import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/types.d.ts";

export const filterTypographyTokens: Filter["filter"] = (token) => token.isSource && token.path.includes("typography");

export const registerFilterTypographyTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterTypographyTokens,
    filter: filterTypographyTokens,
  });

export const FilterTypographyTokens = "calcite/filter/tokens/typography";
