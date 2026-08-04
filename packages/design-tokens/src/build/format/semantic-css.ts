import prettierSync from "@prettier/sync";
import type { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/interfaces.d.ts";
import { createScopedReferenceDeclarations, createVarList, isReplacementToken } from "./utils/index.ts";

export const registerFormatSemanticCss: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatSemanticCss,
    format: formatSemanticCss,
  });
};

export const formatSemanticCss: FormatFn = async (args) => {
  const { dictionary, file } = args;
  const header = await fileHeader({ file });
  const root = `:root {${createVarList("css", dictionary, args)}}`;
  const scopedReferenceTokens = dictionary.allTokens.filter(isReplacementToken);
  const scopedReferences = scopedReferenceTokens.length
    ? `:where(*) {${createScopedReferenceDeclarations(scopedReferenceTokens, dictionary).join("")}}`
    : "";
  const content = [root, scopedReferences].filter((item) => !!item).join("");

  return prettierSync.format(`${header}${content}`, {
    parser: "css",
  });
};

export const FormatSemanticCss = "calcite/format/semantic-css";
