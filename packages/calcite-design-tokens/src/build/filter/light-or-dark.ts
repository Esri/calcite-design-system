import { Filter } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";
import { isThemed } from "../utils/token-types.js";

export const isLightOrDarkColorToken: Filter["filter"] = (token) =>
  isThemed(token, { targetPropName: "filePath" }) || isThemed(token, { targetPropName: "path" });

const filterLightOrDarkColorTokens: Filter["filter"] = (token) =>
  token.isSource && (isThemed(token, { targetPropName: "filePath" }) || isThemed(token, { targetPropName: "path" }));

export const registerFilterLightOrDarkColorTokens: RegisterFn = () =>
  StyleDictionary.registerFilter({
    name: FilterLightOrDarkColorTokens,
    filter: filterLightOrDarkColorTokens,
  });

export const FilterLightOrDarkColorTokens = "calcite/filter/tokens/color/light-or-dark";
