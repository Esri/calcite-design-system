import prettierSync from "@prettier/sync";
import type { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/interfaces.d.ts";
import { createReplacementVarList, createVarList } from "./utils/index.ts";

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
  const replacementAliases = createReplacementVarList(dictionary);
  const content = `${root}${replacementAliases ? `:where(*) {${replacementAliases}}` : ""}`;

  return prettierSync.format(`${header}${content}`, {
    parser: "css",
  });
};

export const FormatSemanticCss = "calcite/format/semantic-css";
