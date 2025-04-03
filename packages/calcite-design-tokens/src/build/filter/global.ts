import { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";
import { isBreakpoint } from "../utils/token-types.js";
import { state } from "../shared/state.js";
import { isLightOrDarkColorToken } from "./light-or-dark.js";

export const filterGlobalTokens: Filter["filter"] = (token, config) => {
  return (
    state.sameValueThemeTokens.has(token.key) ||
    (token.isSource && !(token.type === "typography" || isBreakpoint(token) || isLightOrDarkColorToken(token, config)))
  );
};

export const registerFilterGlobalTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterGlobalTokens,
    filter: filterGlobalTokens,
  });

export const FilterGlobalTokens = "calcite/filter/tokens/global";
