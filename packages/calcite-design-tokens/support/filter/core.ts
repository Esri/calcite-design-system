import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const filterCoreTokens: Filter["filter"] = (token) =>
  !token.isSource &&
  !(token.type === "breakpoint" || token.type === "min" || token.type === "max" || token.type === "typography");

export const registerFilterCoreTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterCoreTokens,
    filter: filterCoreTokens,
  });

export const FilterCoreTokens = "filter/CoreTokens";
