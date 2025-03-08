import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const filterIncludeTokens: Filter["filter"] = (token) => !token.isSource;

export const registerFilterIncludeTokens: RegisterFn = async (sd) => {
  sd.registerFilter({
    name: FilterIncludeTokens,
    filter: filterIncludeTokens,
  });
};

export const FilterIncludeTokens = "calcite/filter/tokens/include";
