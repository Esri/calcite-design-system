import { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";

export const filterIncludeTokens: Filter["filter"] = (token) => !token.isSource;

export const registerFilterIncludeTokens: RegisterFn = async () => {
  StyleDictionary.registerFilter({
    name: FilterIncludeTokens,
    filter: filterIncludeTokens,
  });
};

export const FilterIncludeTokens = "calcite/filter/tokens/include";
