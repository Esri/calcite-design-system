import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/interfaces.d.ts";
import { isThemed } from "../utils/token-types.ts";

export const filterLightColorTokens: Filter["filter"] = (token) => isThemed(token, { theme: "light" });

export const registerFilterLightColorTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterLightColorTokens,
    filter: filterLightColorTokens,
  });

export const FilterLightColorTokens = "calcite/filter/tokens/color/light";
