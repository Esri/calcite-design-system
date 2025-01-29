import { relative, resolve } from "path";
import StyleDictionary from "style-dictionary";
import prettierSync from "@prettier/sync";
import { Config, Dictionary, File, LocalOptions } from "style-dictionary/types";
import { __dirname } from "../utils/node.js";

export async function formatDocsPlatform({
  dictionary,
}: {
  dictionary: Dictionary;
  file: File;
  options: Config & LocalOptions;
}): Promise<string> {
  const output = {
    timestamp: Date.now(),
    tokens: dictionary.allTokens.map((token) => {
      token.value = typeof token.value !== "string" ? JSON.stringify(token.value) : token.value;
      token.filePath = relative(resolve(__dirname, "..", "..", "..", "..", ""), token.filePath);
      delete token.original;
      return token;
    }),
  };

  return prettierSync.format(JSON.stringify(output, null, 2), { parser: "json" });
}

export const registerFormatDocs = async (sd: typeof StyleDictionary): Promise<void> => {
  sd.registerFormat({
    name: FormatCalciteDocs,
    format: formatDocsPlatform,
  });
};

export const FormatCalciteDocs = "calcite/format/docs";
