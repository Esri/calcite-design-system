import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const filterSemanticTokens: Filter["filter"] = (token) =>
  token.isSource && !(token.type === "color" || token.type === "typography");

export const registerFilterSemanticTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterSemanticTokens,
    filter: filterSemanticTokens,
  });

export const FilterSemanticTokens = "calcite/filter/tokens/semantic";
