import { TransformedToken, ValueTransform } from "style-dictionary/types";
import { getNumberAndUnit } from "../../utils/getNumberAndUnit.js";
import { RegisterFn } from "../../types/interfaces.js";

function isBreakpoint(token: TransformedToken) {
  return token.type === "breakpoint";
}

function isUnitless(token: TransformedToken) {
  const matcher = getNumberAndUnit(token);
  if (!matcher || matcher.groups.number === "0" || matcher.groups.unit) {
    return false;
  }

  return true;
}

function isSource(token: TransformedToken) {
  return token.isSource;
}

function filter(token: TransformedToken) {
  return isSource(token) && isBreakpoint(token) && isUnitless(token);
}

const transformValueSizeUnitlessToPx: ValueTransform["transform"] = (token, _config, options) => {
  const value = options.usesDtcg ? token.$value : token.value;
  const parsedVal = parseFloat(value);

  return `${parsedVal}px`;
};

export const registerValueSizeUnitlessToPx: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformValueSizeUnitlessToPx,
    type: "value",
    filter,
    transitive: true,
    transform: transformValueSizeUnitlessToPx,
  });
};

export const TransformValueSizeUnitlessToPx = "calcite/value/UnitlessToPx";
