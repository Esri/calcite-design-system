import type { Filter, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../../types.ts";
import { isSize, isSpacing } from "../../utils/token-types.ts";

export const densityFactorVar = "--calcite-density-factor";
export const densityIncludeSizeVar = "--calcite-density-include-size";

// structural/offset primitives are not scaled to avoid sub-pixel blur and misalignment
const excludedSpacingKeys = ["none", "px", "base"];
const excludedPaths = ["size.default.px", "size.fixed.xxxs"];

const filter: Filter["filter"] = (token) =>
  token.isSource &&
  (isSpacing(token) || isSize(token)) &&
  !excludedSpacingKeys.includes(token.path[token.path.length - 1]) &&
  !excludedPaths.includes(token.path.join(".")) &&
  !String(token.$value).includes(densityFactorVar);

// size tokens only scale when the 0/1 include-size switch is on
const transformValueSpacingDensity: ValueTransform["transform"] = (token) =>
  isSize(token)
    ? `calc(${token.$value} * (1 + (var(${densityFactorVar}, 1) - 1) * var(${densityIncludeSizeVar}, 0)))`
    : `calc(${token.$value} * var(${densityFactorVar}, 1))`;

export const registerValueSpacingDensity: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformValueSpacingDensity,
    type: "value",
    filter,
    transitive: true,
    transform: transformValueSpacingDensity,
  });
};

export const TransformValueSpacingDensity = "calcite/transform/value/spacing-density";
