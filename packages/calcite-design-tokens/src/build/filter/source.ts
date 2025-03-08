import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const filterSourceTokens: Filter["filter"] = (token) => token.isSource;

export const registerFilterSourceTokens: RegisterFn = async (sd) => {
  sd.registerFilter({
    name: FilterSourceTokens,
    filter: filterSourceTokens,
  });
};

export const FilterSourceTokens = "calcite/filter/tokens/source";
