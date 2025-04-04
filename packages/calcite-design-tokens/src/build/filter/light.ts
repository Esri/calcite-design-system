import { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";
import { isThemed } from "../utils/token-types.js";

export const filterLightColorTokens: Filter["filter"] = (token) => isThemed(token, { theme: "light" });

export const registerFilterLightColorTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterLightColorTokens,
    filter: filterLightColorTokens,
  });

export const FilterLightColorTokens = "calcite/filter/tokens/color/light";
