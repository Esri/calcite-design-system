import { TransformedToken, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { getNumberAndUnit } from "../../utils/get-number-and-unit.js";
import { RegisterFn } from "../../types/interfaces.js";
import { isBreakpoint } from "../../utils/token-types.js";

function isUnitless(token: TransformedToken) {
  const matcher = getNumberAndUnit(token);
  if (!matcher || !matcher.groups || matcher.groups.number === "0" || matcher.groups.unit) {
    return false;
  }

  return true;
}

function filter(token: TransformedToken) {
  return isBreakpoint(token) && isUnitless(token);
}

const transformValueSizeUnitlessToPx: ValueTransform["transform"] = (token, _config, options) => {
  const value = options.usesDtcg ? token.$value : token.value;
  const parsedVal = parseFloat(value);

  return `${parsedVal}px`;
};

export const registerValueSizeUnitlessToPx: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformValueSizeUnitlessToPx,
    type: "value",
    filter,
    transitive: true,
    transform: transformValueSizeUnitlessToPx,
  });
};

export const TransformValueSizeUnitlessToPx = "calcite/transform/value/unitless-breakpoint-to-px";
