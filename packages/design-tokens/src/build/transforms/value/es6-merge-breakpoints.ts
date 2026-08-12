import type { ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../../types/types.ts";
import { semantic } from "../../dictionaries/index.ts";
import { isBreakpointMinToken } from "../../utils/token-types.ts";
import { get } from "es-toolkit/compat";

type MergedBreakpointValue = {
  min: string;
  max?: string;
};

/**
 * This transform is used to merge individual min/max container size tokens into a single parent one for ES6, which means:
 *
 * - the max token path/value is derived from the min token
 * - the max-value token is filtered out
 * - the min-value token needs to be renamed as the parent one and used for the output (see matching name transform)
 */

const transformValueMergeBreakpoints: ValueTransform["transform"] = async (token) => {
  const value: MergedBreakpointValue = {
    min: token.$value,
  };

  const maxValuePath = token.path.map((part) => (part === "min" ? "max" : part)).join(".");
  const matchingMaxValueToken = get(semantic.tokens, maxValuePath);

  if (matchingMaxValueToken) {
    value.max = matchingMaxValueToken.$value;
  }

  return value;
};

export const registerValueMergeBreakpoints: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformValueEs6MergeBreakpoints,
    type: "value",
    transitive: true,
    filter: isBreakpointMinToken,
    transform: transformValueMergeBreakpoints,
  });
};

export const TransformValueEs6MergeBreakpoints = "calcite/transform/value/es6-merge-breakpoints";
