import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/interfaces.d.ts";

export const filterInternalTokens: Filter["filter"] = (token) => !token.isSource && token.path[0] === "internal";

export const registerFilterInternalTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterInternalTokens,
    filter: filterInternalTokens,
  });

export const FilterInternalTokens = "calcite/filter/tokens/internal";
