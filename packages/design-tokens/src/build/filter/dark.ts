import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types.ts";
import { isThemed, isThemingToken } from "../utils/token-types.ts";

export const filterDarkColorTokens: Filter["filter"] = (token) =>
  isThemed(token, { theme: "dark" }) && !isThemingToken(token);

export const registerFilterDarkColorTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterDarkColorTokens,
    filter: filterDarkColorTokens,
  });

export const FilterDarkColorTokens = "calcite/filter/tokens/color/dark";
