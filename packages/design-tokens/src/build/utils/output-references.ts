import type { OutputReferences } from "style-dictionary/types";
import { isCornerRadius } from "./token-types.ts";

export const primitiveValueOutputReferences: Exclude<OutputReferences, boolean> = (token) => {
  return !!(token.$type === "color" && token.path.includes("focus"));
};

export const stylesheetOutputReferences: OutputReferences = (token, options) => {
  // output specific token references to match test output
  return !!(isCornerRadius(token) && token.path.includes("default")) || primitiveValueOutputReferences(token, options);
};
