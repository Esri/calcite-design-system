import type { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";
import { isBreakpoint } from "../utils/token-types.js";

export const filterSemanticTokens: Filter["filter"] = (token) =>
  token.isSource && !(token.type === "color" || token.type === "typography" || isBreakpoint(token));

export const registerFilterSemanticTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterSemanticTokens,
    filter: filterSemanticTokens,
  });

export const FilterSemanticTokens = "calcite/filter/tokens/semantic";
