import type { OutputReferences } from "style-dictionary/types";

export const primitiveValueOutputReferences: Exclude<OutputReferences, boolean> = (token) => {
  return !!(token.type === "color" && token.path.includes("focus"));
};
