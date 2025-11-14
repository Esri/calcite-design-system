import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/interfaces.d.ts";
import { isBreakpoint } from "../utils/token-types.ts";
import { state } from "../shared/state.ts";
import { isLightOrDarkColorToken } from "./light-or-dark.ts";

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
