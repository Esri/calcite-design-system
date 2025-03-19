import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const filterCoreTokens: Filter["filter"] = (token) => !token.isSource && token.type !== "typography";

export const registerFilterCoreTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterCoreTokens,
    filter: filterCoreTokens,
  });

export const FilterCoreTokens = "calcite/filter/tokens/core";
