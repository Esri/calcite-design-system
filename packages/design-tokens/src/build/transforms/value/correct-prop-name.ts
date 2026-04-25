import type { Filter, TransformedToken, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../../types/interfaces.d.ts";

const correctedValueTypes = ["shadow"] as const;
const filterTypes: Filter["filter"] = (token) =>
  correctedValueTypes.includes(token.type) && typeof token.value === "object";

type ShadowWithOffset = {
  offsetX: string;
  offsetY: string;
  x?: string;
  y?: string;
};

type NormalizedShadow = Omit<ShadowWithOffset, "offsetX" | "offsetY"> & {
  x: string;
  y: string;
};

function hasShadowOffset(value: unknown): value is ShadowWithOffset {
  return typeof value === "object" && value !== null && "offsetX" in value && "offsetY" in value;
}

function fixableShadowToken(token: TransformedToken): token is TransformedToken & { type: "shadow" } {
  return token.type === "shadow";
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
    token.value = Array.isArray(token.value)
      ? token.value.map((value) => (hasShadowOffset(value) ? normalizeShadowOffset(value) : value))
      : hasShadowOffset(token.value)
        ? normalizeShadowOffset(token.value)
        : token.value;
  }

  return token.value;
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
