import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types.ts";
import { isThemed, isThemingToken } from "../utils/token-types.ts";

export const filterLightColorTokens: Filter["filter"] = (token) =>
  isThemed(token, { theme: "light" }) && !isThemingToken(token);

export const registerFilterLightColorTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterLightColorTokens,
    filter: filterLightColorTokens,
  });

export const FilterLightColorTokens = "calcite/filter/tokens/color/light";
