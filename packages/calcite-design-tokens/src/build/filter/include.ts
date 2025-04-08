import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";
import { isThemed } from "../utils/token-types.js";

export const filterIncludeTokens: Filter["filter"] = (token) => !token.isSource && !isThemed(token);

export const registerFilterIncludeTokens: RegisterFn = () => {
  StyleDictionary.registerFilter({
    name: FilterIncludeTokens,
    filter: filterIncludeTokens,
  });
};

export const FilterIncludeTokens = "calcite/filter/tokens/include";
