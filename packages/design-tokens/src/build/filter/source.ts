import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types.ts";
import { isThemingToken } from "../utils/token-types.ts";

export const filterSourceTokens: Filter["filter"] = (token) => token.isSource && !isThemingToken(token);

export const registerFilterSourceTokens: RegisterFn = () => {
  StyleDictionary.registerFilter({
    name: FilterSourceTokens,
    filter: filterSourceTokens,
  });
};

export const FilterSourceTokens = "calcite/filter/tokens/source";
