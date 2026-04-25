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

function hasShadowOffset(value: unknown): value is ShadowWithOffset {
  return typeof value === "object" && value !== null && "offsetX" in value && "offsetY" in value;
}

function fixableShadowToken(token: TransformedToken): token is TransformedToken & { type: "shadow" } {
  return token.type === "shadow";
}

function normalizeShadowOffset(shadow: ShadowWithOffset): ShadowWithOffset {
  shadow.x = shadow.offsetX;
  delete shadow.offsetX;
  shadow.y = shadow.offsetY;
  delete shadow.offsetY;

  return shadow;
}

const transformValueCorrectPropName: ValueTransform["transform"] = (token) => {
  if (fixableShadowToken(token)) {
    token.value = Array.isArray(token.value)
      ? token.value.map((value) => (hasShadowOffset(value) ? normalizeShadowOffset(value) : value))
      : normalizeShadowOffset(token.value);
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
