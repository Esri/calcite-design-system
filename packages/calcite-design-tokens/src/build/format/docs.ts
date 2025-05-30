import prettierSync from "@prettier/sync";
import type { FormatFn, TransformedToken } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";
import { cleanAttributes } from "./utils/index.js";

export const formatDocsPlatform: FormatFn = async ({ dictionary }) => {
  const output = {
    timestamp: Date.now(),
    tokens: dictionary.allTokens.map((token) => {
      token.value = typeof token.value !== "string" ? JSON.stringify(token.value) : token.value;

      delete (token as Partial<Pick<TransformedToken, "original">>).original;
      cleanAttributes(token);

      return token;
    }),
  };

  return prettierSync.format(JSON.stringify(output, null, 2), { parser: "json" });
};

export const registerFormatDocs: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatCalciteDocs,
    format: formatDocsPlatform,
  });
};

export const FormatCalciteDocs = "calcite/format/docs";
