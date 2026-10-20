import type { Filter, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../../types.ts";
import { isFontScaled } from "../../utils/token-types.ts";

export const fontScaleVar = "--calcite-font-scale";

const filter: Filter["filter"] = (token) =>
  token.isSource && isFontScaled(token) && !String(token.$value).includes(fontScaleVar);

const transformValueFontScale: ValueTransform["transform"] = (token) =>
  `calc(${token.$value} * var(${fontScaleVar}, 1))`;

export const registerValueFontScale: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformValueFontScale,
    type: "value",
    filter,
    transitive: true,
    transform: transformValueFontScale,
  });
};

export const TransformValueFontScale = "calcite/transform/value/font-scale";
