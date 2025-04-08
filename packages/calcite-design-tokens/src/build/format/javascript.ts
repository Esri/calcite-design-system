import prettierSync from "@prettier/sync";
import type { FormatFn } from "style-dictionary/types";
import { convertTokenData, fileHeader } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../types/interfaces.js";
import { cleanAttributes } from "./utils/index.js";

export const formatJsPlatform: FormatFn = async ({ dictionary, file }) => {
  const header = await fileHeader({ file });
  const tokens = convertTokenData(
    dictionary.allTokens.map((token) => {
      cleanAttributes(token);
      return token;
    }),
    { output: "object" },
  );

  return prettierSync.format(`${header}export default ${JSON.stringify(tokens, null, 2)};`, { parser: "babel" });
};

export const registerFormatJs: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatCalciteJs,
    format: formatJsPlatform,
  });
};

export const FormatCalciteJs = "calcite/format/js";
