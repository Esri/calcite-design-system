import StyleDictionary from "style-dictionary";

export function transformValueShadowShorthand(token: any): any {
  if (token.filePath.includes("shadow")) {
    if (token.type === "boxShadow") {
      return `${Object.values(token.value).join(" ")}`;
    }
  }

  return token.value;
}

export function registerValueShadowShorthand(sd: typeof StyleDictionary): void {
  sd.registerTransform({
    name: ValueShadowShorthand,
    transform: transformValueShadowShorthand,
    type: "value",
  });
}

export const ValueShadowShorthand = "calcite/value/ShadowShorthand";
