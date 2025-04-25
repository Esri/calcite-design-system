import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";
import { isLightOrDarkColorToken } from "./light-or-dark.js";

export const filterGlobalTokensJs: Filter["filter"] = (token, config) => {
  return token.isSource || isLightOrDarkColorToken(token, config);
};

export const registerFilterGlobalTokensJs: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterGlobalTokensJs,
    filter: filterGlobalTokensJs,
  });

export const FilterGlobalTokensJs = "calcite/filter/tokens/global/js";
