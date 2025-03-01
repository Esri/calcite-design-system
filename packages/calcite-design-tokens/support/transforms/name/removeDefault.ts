import { TransformedToken } from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

export function transformNameRemoveDefault(token: TransformedToken): string {
  let name = token.name;

  token.path.forEach((path, idx) => {
    if (path === "default") {
      name = name.replace(/-?default-?/, idx === token.path.length - 1 ? "" : "-");
    }
  });

  return name;
}

function filterByPathIncludesDefault(token: TransformedToken): boolean {
  return token.path.includes("default");
}

export const registerNameRemoveDefault: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformNameRemoveDefault,
    transform: transformNameRemoveDefault,
    type: "name",
    filter: filterByPathIncludesDefault,
  });
};

export const TransformNameRemoveDefault = "calcite/name/removeDefault";
