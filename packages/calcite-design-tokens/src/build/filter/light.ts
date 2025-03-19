import { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";
import { isThemed } from "../utils/token-types.js";

export const filterLightColorTokens: Filter["filter"] = (token) =>
  token.isSource &&
  (isThemed(token, { theme: "light", targetPropName: "filePath" }) ||
    isThemed(token, { theme: "light", targetPropName: "path" }));

export const registerFilterLightColorTokens: RegisterFn = async () =>
  StyleDictionary.registerFilter({
    name: FilterLightColorTokens,
    filter: filterLightColorTokens,
  });

export const FilterLightColorTokens = "calcite/filter/tokens/color/light";
