import { Core as StyleDictionary, TransformedToken } from "style-dictionary";

export function valueStringWrapperFunction(token: TransformedToken): string {
  return typeof token.value === "string" && token.value.includes(" ") ? `"${token.value}"` : token.value;
}

export const registerValueStringWrapper = (sd: StyleDictionary): void => {
  sd.registerTransform({
    name: valueStringWrapper,
    type: "value",
    transformer: valueStringWrapperFunction,
  });
};

export const valueStringWrapper = "value/calcite/value-string-wrapper";
