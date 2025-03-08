import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";
import { filterLightOrDarkColorTokens } from "./lightOrDark.js";
import { mediumLowSaturation } from "./utils/index.js";

export const filterGlobalTokens: Filter["filter"] = (token, config) => {
  return (
    filterLightOrDarkColorTokens(token, config) ||
    (token.isSource && token.type !== "typography" && !mediumLowSaturation.test(token.name))
  );
};

export const registerFilterGlobalTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterGlobalTokens,
    filter: filterGlobalTokens,
  });

export const FilterGlobalTokens = "filter/tokens/global";
