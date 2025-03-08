import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const filterLightOrDarkColorTokens: Filter["filter"] = (token) =>
  token.type === "color" && (token.filePath.includes("light") || token.filePath.includes("dark"));

export const registerFilterLightOrDarkColorTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterLightOrDarkColorTokens,
    filter: filterLightOrDarkColorTokens,
  });

export const FilterLightOrDarkColorTokens = "calcite/filter/tokens/color/light-or-dark";
