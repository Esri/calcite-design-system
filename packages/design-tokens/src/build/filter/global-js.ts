import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/interfaces.d.ts";
import { isLightOrDarkColorToken } from "./light-or-dark.ts";

export const filterGlobalTokensJs: Filter["filter"] = (token, config) => {
  return token.isSource || isLightOrDarkColorToken(token, config);
};

export const registerFilterGlobalTokensJs: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterGlobalTokensJs,
    filter: filterGlobalTokensJs,
  });

export const FilterGlobalTokensJs = "calcite/filter/tokens/global/js";
