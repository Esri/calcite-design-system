import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

const mediumLowSaturation = /(medium|low)-{0,1}saturation/i;

export const filterCoreTokens: Filter["filter"] = (token) =>
  !token.isSource &&
  !(token.type === "min" || token.type === "max" || token.type === "typography") &&
  !mediumLowSaturation.test(token.name);

export const registerFilterCoreTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterCoreTokens,
    filter: filterCoreTokens,
  });

export const FilterCoreTokens = "filter/tokens/core";
