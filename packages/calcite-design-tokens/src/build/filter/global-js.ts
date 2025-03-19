import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

/**
 * This filter helps match the test snapshot, this can be removed once outputs are consolidated
 *
 * @param token
 */
export const filterGlobalTokensJs: Filter["filter"] = (token) => {
  return token.isSource;
};

export const registerFilterGlobalTokensJs: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterGlobalTokensJs,
    filter: filterGlobalTokensJs,
  });

export const FilterGlobalTokensJs = "calcite/filter/tokens/global/js";
