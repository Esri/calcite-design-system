import type { OutputReferences } from "style-dictionary/types";
import { isThemingToken } from "./token-types.ts";

export const primitiveValueOutputReferences: Exclude<OutputReferences, boolean> = (token) => {
  return !!(token.$type === "color" && token.path.includes("focus"));
};

// theme tokens are an override layer and must always alias their underlying semantic token
export const colorOutputReferences: Exclude<OutputReferences, boolean> = (token, options) => {
  return primitiveValueOutputReferences(token, options) || isThemingToken(token);
};
