import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/interfaces.d.ts";
import { isLightOrDarkColorToken } from "./light-or-dark.ts";

export const filterCoreTokens: Filter["filter"] = (token, config) =>
  !token.isSource && token.type !== "typography" && !isLightOrDarkColorToken(token, config);

export const registerFilterCoreTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterCoreTokens,
    filter: filterCoreTokens,
  });

export const FilterCoreTokens = "calcite/filter/tokens/core";
