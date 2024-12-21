import StyleDictionary from "style-dictionary";

function transformShadow(
  shadow: Record<"x" | "offsetX" | "y" | "offsetY" | "blur" | "spread" | "color", string> | string,
): string {
  if (typeof shadow === "string") {
    return shadow;
  }

  return `${shadow.x || shadow.offsetX} ${shadow.y || shadow.offsetY} ${shadow.blur} ${shadow.spread} ${shadow.color}`;
}

export function transformValueCSSShadow(token: any): any {
  if (Array.isArray(token.value)) {
    return token.value.map((shadow) => transformShadow(shadow)).join(", ");
  }

  if (typeof token.value === "object") {
    return transformShadow(token.value);
  }

  return token.value;
}

export function registerValueCSSShadow(sd: typeof StyleDictionary): void {
  sd.registerTransform({
    name: ValueCSSShadow,
    transform: transformValueCSSShadow,
    transitive: true,
    filter: (token) => (token.type === "boxShadow" || token.type === "shadow") && token.isSource,
    type: "value",
  });
}

export const ValueCSSShadow = "calcite/value/CSSShadow";
