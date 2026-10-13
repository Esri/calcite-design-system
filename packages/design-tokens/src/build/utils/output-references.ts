import type { OutputReferences } from "style-dictionary/types";
import { isCornerRadius } from "./token-types.ts";

export const primitiveValueOutputReferences: Exclude<OutputReferences, boolean> = (token) => {
  return !!(token.$type === "color" && token.path.includes("focus"));
};

export const hasOutputReferenceExtension = (token: Parameters<Exclude<OutputReferences, boolean>>[0]): boolean =>
  !!(
    token.original?.$extensions?.["calcite.outputReference"] || token.original?.extensions?.["calcite.outputReference"]
  );

export const stylesheetOutputReferences: Exclude<OutputReferences, boolean> = (token, options) => {
  return (
    hasOutputReferenceExtension(token) ||
    (isCornerRadius(token) && token.path.includes("default")) ||
    primitiveValueOutputReferences(token, options)
  );
};
