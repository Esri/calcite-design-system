import { Config } from "style-dictionary";
import { TransformedToken, ValueTransform } from "style-dictionary/types";
import { RegisterFn } from "../../types/interfaces.js";

function getBasePxFontSize(config) {
  return (config && config.basePxFontSize) || 16;
}

function isDimension(token: TransformedToken, options: Config) {
  return (options.usesDtcg ? token.$type : token.type) === "dimension";
}

function isFontSize(token: TransformedToken, options: Config) {
  return (options.usesDtcg ? token.$type : token.type) === "fontSize";
}

function isSource(token: TransformedToken) {
  return token.isSource;
}

function isPxUnit(token: TransformedToken) {
  const matcher = /(?<number>[\d.]+)(?<unit>[a-z%]*)/g.exec(
    token.value || token.value.value || token.original.value || token.original.value.value,
  );

  if (!matcher || !matcher.groups.unit || ["", "rem", "%"].includes(matcher.groups?.unit)) {
    return false;
  }

  return true;
}

function throwSizeError(name, value, unitType) {
  throw `Invalid Number: '${name}: ${value}' is not a valid number, cannot transform to '${unitType}' \n`;
}

function isNotBorderOrFixed(token: TransformedToken) {
  return !token.path.some((path) => ["border", "fixed"].includes(path));
}

function isNotBreakpointType(token: TransformedToken) {
  return !(token.type === "breakpoint");
}

function filter(token: TransformedToken, options: Config) {
  return (
    isSource(token) &&
    isNotBreakpointType(token) &&
    isNotBorderOrFixed(token) &&
    (isDimension(token, options) || isFontSize(token, options)) &&
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

export const registerValueSizePxToRem: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformValueSizePxToRem,
    type: "value",
    filter,
    transitive: true,
    transform: transformValueSizePxToRem,
  });
};

export const TransformValueSizePxToRem = "calcite/value/pxToRem";
