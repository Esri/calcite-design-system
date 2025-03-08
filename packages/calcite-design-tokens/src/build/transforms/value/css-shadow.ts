import { ValueTransform } from "style-dictionary/types";
import { RegisterFn } from "../../types/interfaces.js";

function transformShadow(
  shadow: Record<"x" | "offsetX" | "y" | "offsetY" | "blur" | "spread" | "color", string> | string,
): string {
  if (typeof shadow === "string") {
    return shadow;
  }

  return `${shadow.x || shadow.offsetX} ${shadow.y || shadow.offsetY} ${shadow.blur} ${shadow.spread} ${shadow.color}`;
}

export const transformValueCSSShadow: ValueTransform["transform"] = (token) => {
  if (Array.isArray(token.original.value)) {
    return token.original.value
      .map((shadow) => {
        if (shadow[0] === "{") {
          const newShadow = Object.values(shadow).join("");
          return transformShadow(newShadow);
        }
        return transformShadow(shadow);
      })
      .join(", ");
  }

  if (typeof token.original.value === "object") {
    return transformShadow(token.original.value);
  }

  return token.value;
};

export const registerValueCSSShadow: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformValueCSSShadow,
    transform: transformValueCSSShadow,
    transitive: true,
    filter: (token) => token.type === "boxShadow" || token.type === "shadow",
    type: "value",
  });
};

export const TransformValueCSSShadow = "calcite/transform/value/css-shadow";
