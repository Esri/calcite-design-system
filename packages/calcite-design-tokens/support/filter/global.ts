import { Filter } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

const mediumLowSaturation = /(medium|low)-{0,1}saturation/i;

export const filterGlobalTokens: Filter["filter"] = (token) =>
  token.isSource &&
  !(
    token.type === "color" ||
    token.type === "dark" ||
    token.type === "light" ||
    token.type === "breakpoint" ||
    token.type === "min" ||
    token.type === "max" ||
    token.type === "typography"
  ) &&
  !mediumLowSaturation.test(token.name);

export const registerFilterGlobalTokens: RegisterFn = async (sd) =>
  sd.registerFilter({
    name: FilterGlobalTokens,
    filter: filterGlobalTokens,
  });

export const FilterGlobalTokens = "filter/GlobalTokens";
