import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";
import { isLightOrDarkColorToken } from "./light-or-dark.js";

/**
 * This filter helps match the test snapshot, this can be removed once outputs are consolidated
 *
 * @param token
 * @param config
 */
export const filterGlobalTokensJs: Filter["filter"] = (token, config) => {
  return token.isSource || isLightOrDarkColorToken(token, config);
};

export const registerFilterGlobalTokensJs: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterGlobalTokensJs,
    filter: filterGlobalTokensJs,
  });

export const FilterGlobalTokensJs = "calcite/filter/tokens/global/js";
