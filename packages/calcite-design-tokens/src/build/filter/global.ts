import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";
import { isLightOrDarkColorToken } from "./light-or-dark.js";
import { mediumLowSaturation } from "./utils/index.js";

export const filterGlobalTokens: Filter["filter"] = (token, config) => {
  const themedColorToken = token.type === "color" && (token.path.includes("light") || token.path.includes("dark"));

  return (
    isLightOrDarkColorToken(token, config) ||
    (token.isSource && !(token.type === "typography" || mediumLowSaturation.test(token.name) || themedColorToken))
  );
};

export const registerFilterGlobalTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterGlobalTokens,
    filter: filterGlobalTokens,
  });

export const FilterGlobalTokens = "calcite/filter/tokens/global";
