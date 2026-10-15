import type { Filter, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../../types.ts";
import { isSpacing } from "../../utils/token-types.ts";

export const densityFactorVar = "--calcite-density-factor";

// structural/offset primitives are not scaled to avoid sub-pixel blur and misalignment
const excludedSpacingKeys = ["none", "px", "base"];

const filter: Filter["filter"] = (token) =>
  token.isSource &&
  isSpacing(token) &&
  !excludedSpacingKeys.includes(token.path[token.path.length - 1]) &&
  !String(token.$value).includes(densityFactorVar);

const transformValueSpacingDensity: ValueTransform["transform"] = (token) =>
  `calc(${token.$value} * var(${densityFactorVar}, 1))`;

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
