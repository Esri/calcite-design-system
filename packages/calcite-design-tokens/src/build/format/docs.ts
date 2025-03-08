import { relative, resolve } from "node:path";
import prettierSync from "@prettier/sync";
import { FormatFn } from "style-dictionary/types";
import { __dirname } from "../utils/node.js";
import { RegisterFn } from "../types/interfaces.js";

export const formatDocsPlatform: FormatFn = async ({ dictionary }) => {
  const output = {
    timestamp: Date.now(),
    tokens: dictionary.allTokens.map((token) => {
      token.value = typeof token.value !== "string" ? JSON.stringify(token.value) : token.value;
      token.filePath = relative(resolve(__dirname, "..", "..", "..", "..", ""), token.filePath);

      delete (token as Partial<Pick<TransformedToken, "original">>).original;
      return token;
    }),
  };

  return prettierSync.format(JSON.stringify(output, null, 2), { parser: "json" });
};

export const registerFormatDocs: RegisterFn = async (sd) => {
  sd.registerFormat({
    name: FormatCalciteDocs,
    format: formatDocsPlatform,
  });
};

export const FormatCalciteDocs = "calcite/format/docs";
