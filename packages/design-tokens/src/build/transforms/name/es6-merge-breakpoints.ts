import type { NameTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../../types/types.ts";
import { isBreakpointMinToken } from "../../utils/token-types.ts";

/**
 * This transform is used to merge individual min/max container size tokens into a single parent one for ES6.
 * It works with the matching value transform.
 */

export const transformNameMergeBreakpoints: NameTransform["transform"] = (token) =>
  token.name.endsWith("Min") ? token.name.slice(0, -3) : token.name;

export const registerNameMergeBreakpoints: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformNameEs6MergeBreakpoints,
    transform: transformNameMergeBreakpoints,
    type: "name",
    filter: isBreakpointMinToken,
  });
};

export const TransformNameEs6MergeBreakpoints = "calcite/transform/name/es6-merge-breakpoints";
