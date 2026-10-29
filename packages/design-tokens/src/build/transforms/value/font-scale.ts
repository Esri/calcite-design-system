import type { Filter, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../../types.ts";
import { isFontScaled } from "../../utils/token-types.ts";

export const fontScaleVar = "--calcite-font-scale";
export const fontScaleIncludeIconsVar = "--calcite-font-scale-include-icons";
export const iconScaleVar = "--calcite-icon-scale";

const filter: Filter["filter"] = (token) =>
  token.isSource && isFontScaled(token) && !String(token.$value).includes(fontScaleVar);

const transformValueFontScale: ValueTransform["transform"] = (token) =>
  `round(${token.$value} * var(${fontScaleVar}, 1), 1px)`;

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
