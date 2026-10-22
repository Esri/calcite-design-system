import type { Filter, PlatformConfig, TransformedToken, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../../types.ts";
import { isBreakpoint, isBreakpointRelated, isCornerRadius, isFontRelated } from "../../utils/token-types.ts";

function getBasePxFontSize(config: PlatformConfig) {
  return (config && config.basePxFontSize) || 16;
}

function isDimension(token: TransformedToken) {
  return token.$type === "dimension";
}

function isSource(token: TransformedToken) {
  return token.isSource;
}

function isPxUnit(token: TransformedToken) {
  const matcher = /(?<number>[\d.]+)(?<unit>[a-z%]*)/g.exec(
    token.$value || token.$value.value || token.original.$value || token.original.$value.value,
  );

  return !!matcher?.groups?.unit && !["", "rem", "%"].includes(matcher.groups.unit);
}

function throwSizeError(name: string, value: string, unitType: string) {
  throw `Invalid Number: '${name}: ${value}' is not a valid number, cannot transform to '${unitType}' \n`;
}

function isStaticPx(token: TransformedToken) {
  return !token.path.some((path) => ["base", "border", "fixed", "px", "space", "spacing"].includes(path));
}

const filter: Filter["filter"] = (token) =>
  isSource(token) &&
  !isBreakpoint(token) &&
  isStaticPx(token) &&
  isDimension(token) &&
  !isFontRelated(token) &&
  !isCornerRadius(token) &&
  !isBreakpointRelated(token) &&
  isPxUnit(token);

const transformValueSizePxToRem: ValueTransform["transform"] = (token, config) => {
  const value = token.$value;
  const parsedVal = parseFloat(value);
  const baseFont = getBasePxFontSize(config);

  if (isNaN(parsedVal)) {
    if (value === "auto") {
      return "auto";
    }
    throwSizeError(token.name, value, "rem");
  }

  return `${parsedVal / baseFont}rem`;
};

export const registerValueSizePxToRem: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformValueSizePxToRem,
    type: "value",
    filter,
    transitive: true,
    transform: transformValueSizePxToRem,
  });
};

export const TransformValueSizePxToRem = "calcite/transform/value/px-to-rem";
