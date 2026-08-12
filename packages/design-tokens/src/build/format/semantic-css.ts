import prettierSync from "@prettier/sync";
import type { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/interfaces.d.ts";
import { createVarList } from "./utils/index.ts";

export const registerFormatSemanticCss: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatSemanticCss,
    format: formatSemanticCss,
  });
};

export const formatSemanticCss: FormatFn = async (args) => {
  const { dictionary, file } = args;
  const header = await fileHeader({ file });
  const content = `:where(:root) {${createVarList("css", dictionary, args)}}`;

  return prettierSync.format(`${header}${content}`, {
    parser: "css",
  });
};

export const FormatSemanticCss = "calcite/format/semantic-css";
