import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";
import { mediumLowSaturation } from "./utils/index.js";

export const filterSemanticTokens: Filter["filter"] = (token) =>
  token.isSource && !(token.type === "color" || token.type === "typography") && !mediumLowSaturation.test(token.name);

export const registerFilterSemanticTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterSemanticTokens,
    filter: filterSemanticTokens,
  });

export const FilterSemanticTokens = "filter/tokens/semantic";
