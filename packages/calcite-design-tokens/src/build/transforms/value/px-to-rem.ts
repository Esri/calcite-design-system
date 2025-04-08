import { Config } from "style-dictionary";
import { PlatformConfig, TransformedToken, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";
import { isBreakpoint, isBreakpointRelated, isCornerRadius, isFontRelated } from "../../utils/token-types.js";

function getBasePxFontSize(config: PlatformConfig) {
  return (config && config.basePxFontSize) || 16;
}

function isDimension(token: TransformedToken, options: Config) {
  return (options.usesDtcg ? token.$type : token.type) === "dimension";
}

function isSource(token: TransformedToken) {
  return token.isSource;
}

function isPxUnit(token: TransformedToken) {
  const matcher = /(?<number>[\d.]+)(?<unit>[a-z%]*)/g.exec(
    token.value || token.value.value || token.original.value || token.original.value.value,
  );

  if (!matcher || !matcher.groups || !matcher.groups.unit || ["", "rem", "%"].includes(matcher.groups.unit)) {
    return false;
  }

  return true;
}

function throwSizeError(name: string, value: string, unitType: string) {
  throw `Invalid Number: '${name}: ${value}' is not a valid number, cannot transform to '${unitType}' \n`;
}

function isStaticPx(token: TransformedToken) {
  return !token.path.some((path) => ["base", "border", "fixed", "px"].includes(path));
}

function filter(token: TransformedToken, options: Config) {
  return (
    isSource(token) &&
    !isBreakpoint(token) &&
    isStaticPx(token) &&
    isDimension(token, options) &&
    !isFontRelated(token) &&
    !isCornerRadius(token) &&
    !isBreakpointRelated(token) &&
    isPxUnit(token)
  );
}

const transformValueSizePxToRem: ValueTransform["transform"] = (token, config, options) => {
  const value = options.usesDtcg ? token.$value : token.value;
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
