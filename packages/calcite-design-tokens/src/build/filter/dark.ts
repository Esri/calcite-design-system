import { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";
import { isThemed } from "../utils/token-types.js";

export const filterDarkColorTokens: Filter["filter"] = (token) =>
  token.isSource &&
  (isThemed(token, { theme: "dark", targetPropName: "filePath" }) ||
    isThemed(token, { theme: "dark", targetPropName: "path" }));

export const registerFilterDarkColorTokens: RegisterFn = async () =>
  StyleDictionary.registerFilter({
    name: FilterDarkColorTokens,
    filter: filterDarkColorTokens,
  });

export const FilterDarkColorTokens = "calcite/filter/tokens/color/dark";
