import type { OutputReferences } from "style-dictionary/types";

export const primitiveValueOutputReferences: Exclude<OutputReferences, boolean> = (token) => {
  return !!(token.$type === "color" && token.path.includes("focus"));
};

export const hasOutputReferenceExtension = (token: Parameters<Exclude<OutputReferences, boolean>>[0]): boolean =>
  !!(
    token.original?.$extensions?.["calcite.outputReference"] || token.original?.extensions?.["calcite.outputReference"]
  );

export const hasReplacementExtension = (token: Parameters<Exclude<OutputReferences, boolean>>[0]): boolean =>
  !!(token.original?.$extensions?.["calcite.replaces"] || token.original?.extensions?.["calcite.replaces"]);

export const stylesheetOutputReferences: Exclude<OutputReferences, boolean> = (token, options) => {
  // output token references for tokens marked with calcite.outputReference extension
  return hasOutputReferenceExtension(token) || primitiveValueOutputReferences(token, options);
};
