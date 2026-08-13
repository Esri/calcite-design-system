import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/interfaces.d.ts";
import { isThemed } from "../utils/token-types.ts";

export const filterIncludeTokens: Filter["filter"] = (token) => !token.isSource && !isThemed(token);

export const registerFilterIncludeTokens: RegisterFn = () => {
  StyleDictionary.registerFilter({
    name: FilterIncludeTokens,
    filter: filterIncludeTokens,
  });
};

export const FilterIncludeTokens = "calcite/filter/tokens/include";
