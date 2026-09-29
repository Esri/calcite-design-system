import type { Filter, TransformedToken, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../../types.ts";

const correctedValueTypes = ["boxShadow"] as const;
const filterTypes: Filter["filter"] = (token) =>
  correctedValueTypes.includes(token.$type) && typeof token.$value === "object";

type ShadowWithOffset = {
  offsetX: string | number;
  offsetY: string | number;
  x?: string | number;
  y?: string | number;
};

type NormalizedShadow = Omit<ShadowWithOffset, "offsetX" | "offsetY"> & {
  x: string | number;
  y: string | number;
};

function hasShadowOffset(value: unknown): value is ShadowWithOffset {
  return typeof value === "object" && value !== null && "offsetX" in value && "offsetY" in value;
}

function fixableShadowToken(token: TransformedToken): token is TransformedToken & { $type: "boxShadow" } {
  return token.$type === "boxShadow";
}

function normalizeShadowOffset(shadow: ShadowWithOffset): NormalizedShadow {
  const { offsetX, offsetY, ...rest } = shadow;

  return {
    ...rest,
    x: offsetX,
    y: offsetY,
  };
}

const transformValueCorrectPropName: ValueTransform["transform"] = (token) => {
  if (fixableShadowToken(token)) {
    token.$value = Array.isArray(token.$value)
      ? token.$value.map((value) => (hasShadowOffset(value) ? normalizeShadowOffset(value) : value))
      : hasShadowOffset(token.$value)
        ? normalizeShadowOffset(token.$value)
        : token.$value;
  }

  return token.$value;
};

export const registerValueCorrectPropName: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformValueCorrectPropName,
    type: "value",
    transitive: true,
    filter: filterTypes,
    transform: transformValueCorrectPropName,
  });
};

export const TransformValueCorrectPropName = "calcite/transform/value/correct-prop-name";
