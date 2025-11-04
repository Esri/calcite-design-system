import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

export const filterTypographyTokens: Filter["filter"] = (token) => token.isSource && token.path.includes("typography");

export const registerFilterTypographyTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterTypographyTokens,
    filter: filterTypographyTokens,
  });

export const FilterTypographyTokens = "calcite/filter/tokens/typography";
