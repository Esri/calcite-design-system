import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const filterDarkColorTokens: Filter["filter"] = (token) =>
  token.isSource && token.original.type === "color" && token.path[-1] === "dark";

export const registerFilterDarkColorTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterDarkColorTokens,
    filter: filterDarkColorTokens,
  });

export const FilterDarkColorTokens = "filter/tokens/color/dark";
