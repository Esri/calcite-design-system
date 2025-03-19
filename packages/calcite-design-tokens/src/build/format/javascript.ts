import prettierSync from "@prettier/sync";
import { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";

export const formatJsPlatform: FormatFn = async ({ dictionary, file }) => {
  const header = await fileHeader({ file });
  return prettierSync.format(`${header}export default ${JSON.stringify(dictionary.tokens, null, 2)};`, {
    parser: "babel",
  });
};

export const registerFormatJs: RegisterFn = async () => {
  StyleDictionary.registerFormat({
    name: FormatCalciteJs,
    format: formatJsPlatform,
  });
};

export const FormatCalciteJs = "calcite/format/js";
