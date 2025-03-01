import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const filterLightColorTokens: Filter["filter"] = (token) =>
  token.isSource && token.type === "color" && token.path[token.path.length - 1] === "light";

export const registerFilterLightColorTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterLightColorTokens,
    filter: filterLightColorTokens,
  });

export const FilterLightColorTokens = "filter/lightColorTokens";
