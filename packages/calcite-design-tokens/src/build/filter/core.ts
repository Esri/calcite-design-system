import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";
import { isLightOrDarkColorToken } from "./light-or-dark.js";

export const filterCoreTokens: Filter["filter"] = (token, config) =>
  !token.isSource && token.type !== "typography" && !isLightOrDarkColorToken(token, config);

export const registerFilterCoreTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterCoreTokens,
    filter: filterCoreTokens,
  });

export const FilterCoreTokens = "calcite/filter/tokens/core";
