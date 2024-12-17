import StyleDictionary from "style-dictionary";
import type { FormatFn } from "style-dictionary/types";

import prettierSync from "@prettier/sync";
import { relative, resolve } from "path";
import { __dirname } from "../../../utils/node.js";

export const formatDocsPlatform: FormatFn = (args) => {
  const output = {
    timestamp: Date.now(),
    tokens: args.dictionary.allTokens.map((token) => {
      token.value = typeof token.value !== "string" ? JSON.stringify(token.value) : token.value;
      token.filePath = relative(resolve(__dirname, "..", "..", "..", "..", ""), token.filePath);
      delete token.original;
      return token;
    }),
  };

  return prettierSync.format(JSON.stringify(output, null, 2), { parser: "json" });
};

export const registerFormatterDocs = (sd: typeof StyleDictionary): void => {
  sd.registerFormat({
    name: CalciteDocs,
    format: formatDocsPlatform,
  });
};

export const CalciteDocs = "calcite/format/docs";
