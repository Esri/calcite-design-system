import type { Filter, TransformedToken, ValueTransform } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

const correctedValueTypes = ["shadow"] as const;
const filterTypes: Filter["filter"] = (token) =>
  correctedValueTypes.includes(token.type) && typeof token.value === "object";

function fixableShadowToken(
  token: TransformedToken,
): token is TransformedToken & { value: { offsetX: number; offsetY: number } } {
  return (
    token.type === "shadow" && typeof token.value === "object" && "offsetX" in token.value && "offsetY" in token.value
  );
}

const transformValueCorrectPropName: ValueTransform["transform"] = (token) => {
  if (fixableShadowToken(token)) {
    token.value["x"] = token.value.offsetX;
    delete token.value.offsetX;
    token.value["y"] = token.value.offsetY;
    delete token.value.offsetY;
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
