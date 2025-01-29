import StyleDictionary, { Config, PlatformConfig } from "style-dictionary";
import { TransformedToken } from "style-dictionary/types";
import { getNumberAndUnit } from "../../utils/getNumberAndUnit.js";

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

function transformValueSizeUnitlessToPx(token: TransformedToken, config: PlatformConfig, options: Config) {
  const value = options.usesDtcg ? token.$value : token.value;
  const parsedVal = parseFloat(value);

  return `${parsedVal}px`;
}

export async function registerValueSizeUnitlessToPx(sd: typeof StyleDictionary): Promise<void> {
  sd.registerTransform({
    name: TransformValueSizeUnitlessToPx,
    type: "value",
    filter,
    transitive: true,
    transform: transformValueSizeUnitlessToPx,
  });
}

export const TransformValueSizeUnitlessToPx = "calcite/value/UnitlessToPx";
